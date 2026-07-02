import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import "katex/dist/katex.min.css";
import AiBubble from "../components/aiAssistant/AiBubble";
import useMediaQuery from "../components/common/useMediaQuery";
import UserBubble from "../components/aiAssistant/UserBubble";
import InputBar from "../components/aiAssistant/InputBar";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../config/env";
import {
  createAttachmentPreviews,
  createMediaPayload,
  revokeAttachmentPreview,
} from "../components/aiAssistant/mediaHelpers";
import { createAssistantStyles } from "../components/aiAssistant/styles";

const AI_ERROR_MESSAGE = "Sorry, I ran into a problem. :(";

const betaNoticeStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "rgba(5, 5, 8, 0.62)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  card: {
    position: "relative",
    width: "min(440px, 100%)",
    borderRadius: "22px",
    padding: "28px 30px 26px 30px",
    background:
      "linear-gradient(180deg, rgba(31,18,42,0.98) 0%, rgba(15,12,24,0.98) 100%)",
    border: "1px solid rgba(168,85,247,0.28)",
    boxShadow: "0 24px 70px rgba(0,0,0,0.55), 0 0 34px rgba(125,20,86,0.22)",
    color: "#e2e8f0",
    boxSizing: "border-box",
    textAlign: "center",
    animation: "noticePop 0.22s cubic-bezier(0.25, 1, 0.5, 1) forwards",
  },
  closeButton: {
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "20px",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition:
      "background 0.18s ease, border-color 0.18s ease, transform 0.16s ease, box-shadow 0.18s ease",
  },
  title: {
    margin: "0 42px 14px 42px",
    color: "#ffffff",
    fontSize: "1.12rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    background: "linear-gradient(180deg, #ffffff 35%, #cbd5e1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  text: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: "0.95rem",
    lineHeight: 1.7,
    letterSpacing: "0.015em",
    fontWeight: 400,
  },
  signoff: {
    display: "block",
    marginTop: "14px",
    color: "#c084fc",
    fontWeight: 600,
  },
};

async function createEndpointError(response) {
  let serverMessage = "";

  try {
    const data = await response.json();
    serverMessage = data?.error || "";
  } catch {
    serverMessage = await response.text().catch(() => "");
  }

  const error = new Error(
    serverMessage || `Edge Function returned status ${response.status}`,
  );
  error.status = response.status;
  return error;
}

function AiAssistantPage() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [plusHover, setPlusHover] = useState(false);
  const [sendHover, setSendHover] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [showBetaNotice, setShowBetaNotice] = useState(true);
  const [noticeCloseHover, setNoticeCloseHover] = useState(false);

  const chatEndRef = useRef(null);
  const photoInputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const activeRequestUserMessageIdRef = useRef(null);

  // Message ids must be monotonic because abort/edit paths can remove items
  // from the array. Reusing array length would let edit state leak between
  // unrelated messages after a deletion.
  const nextIdRef = useRef(1);

  // Editing an in-flight user message should cancel the network request while
  // keeping the user's text available for editing. This flag distinguishes that
  // path from the Stop button, which intentionally removes the pending message.
  const suppressNextAbortCleanupRef = useRef(false);

  const hasChatStarted = messages.length > 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const styles = useMemo(
    () =>
      createAssistantStyles({
        inputFocused,
        plusHover,
        sendHover,
        isMobile,
      }),
    [inputFocused, isMobile, plusHover, sendHover],
  );

  const processFiles = useCallback((fileList, isImage) => {
    setAttachments((prev) => [
      ...prev,
      ...createAttachmentPreviews(fileList, isImage),
    ]);
    setShowMenu(false);
  }, []);

  const handlePhotoChange = (e) => {
    if (e.target.files.length) processFiles(Array.from(e.target.files), true);
    e.target.value = "";
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => {
      revokeAttachmentPreview(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const dispatchToAI = async (
    updatedMessages,
    triggeringUserMessageId,
    onAbortCleanup,
  ) => {
    const aiPlaceholderId = nextIdRef.current++;
    setMessages((prev) => [
      ...prev,
      { id: aiPlaceholderId, sender: "ai", text: "", isThinking: true },
    ]);

    const controller = new AbortController();
    abortControllerRef.current = controller;
    activeRequestUserMessageIdRef.current = triggeringUserMessageId;
    setIsGenerating(true);

    try {
      const functionUrl = `${SUPABASE_URL}/functions/v1/gemini-chat`;
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: updatedMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw await createEndpointError(response);
      }
      if (!response.body) {
        throw new Error("Edge Function returned no response stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const nextText =
          accumulatedText + decoder.decode(value, { stream: true });
        accumulatedText = nextText;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiPlaceholderId
              ? { ...msg, text: nextText, isThinking: false }
              : msg,
          ),
        );
      }
    } catch (err) {
      const wasAborted = err.name === "AbortError" || controller.signal.aborted;

      if (wasAborted) {
        setMessages((prev) => prev.filter((msg) => msg.id !== aiPlaceholderId));
        if (!suppressNextAbortCleanupRef.current) {
          onAbortCleanup?.();
        }
        suppressNextAbortCleanupRef.current = false;
      } else {
        console.error("AI Assistant Endpoint Bridge Failed:", err);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiPlaceholderId
              ? {
                  ...msg,
                  text: AI_ERROR_MESSAGE,
                  isThinking: false,
                }
              : msg,
          ),
        );
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
      activeRequestUserMessageIdRef.current = null;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() && attachments.length === 0) return;

    let processedMediaPayloads = [];
    try {
      if (attachments.length > 0) {
        processedMediaPayloads = await Promise.all(
          attachments.map(createMediaPayload),
        );
      }
    } catch (error) {
      console.error("Media compilation failure:", error);
    }

    const userMessage = {
      id: nextIdRef.current++,
      sender: "user",
      text: inputValue,
      media: [...attachments],
      mediaData: processedMediaPayloads,
      locked: false,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setAttachments([]);
    setShowMenu(false);

    const textarea = document.querySelector("textarea");
    if (textarea) textarea.style.height = "auto";

    await dispatchToAI(updatedMessages, userMessage.id, () => {
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    });

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === userMessage.id ? { ...msg, locked: true } : msg,
      ),
    );
  };

  const handleStopGenerating = () => {
    abortControllerRef.current?.abort();
  };

  const handleStartEdit = (messageId) => {
    if (isGenerating && activeRequestUserMessageIdRef.current === messageId) {
      suppressNextAbortCleanupRef.current = true;
      abortControllerRef.current?.abort();
    }
    setEditingMessageId(messageId);
  };

  const handleConfirmEdit = async (messageId, newText) => {
    setEditingMessageId(null);

    const editIndex = messages.findIndex((m) => m.id === messageId);
    if (editIndex === -1) return;

    const trimmedHistory = messages.slice(0, editIndex);
    const editedMessage = {
      ...messages[editIndex],
      text: newText,
      locked: false,
    };
    const updatedMessages = [...trimmedHistory, editedMessage];

    setMessages(updatedMessages);
    await dispatchToAI(updatedMessages, editedMessage.id, () => {});

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === editedMessage.id ? { ...msg, locked: true } : msg,
      ),
    );
  };

  const handleCancelEdit = () => setEditingMessageId(null);

  const inputProps = {
    styles,
    showMenu,
    setShowMenu,
    photoHover,
    setPhotoHover,
    plusHover,
    setPlusHover,
    sendHover,
    setSendHover,
    inputFocused,
    setInputFocused,
    attachments,
    inputValue,
    setInputValue,
    handleSendMessage,
    removeAttachment,
    photoInputRef,
    handlePhotoChange,
    isGenerating,
    handleStopGenerating,
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes expandIn { from { opacity: 0; transform: translateY(18px) scaleY(0.95); } to { opacity: 1; transform: translateY(0) scaleY(1); } }
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(10px); }            to { opacity: 1; transform: translateY(0); } }
        @keyframes noticePop { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      {showBetaNotice && (
        <div
          style={betaNoticeStyles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="beta-notice-title"
        >
          <div style={betaNoticeStyles.card}>
            <button
              type="button"
              aria-label="Close beta notice"
              onClick={() => setShowBetaNotice(false)}
              onMouseEnter={() => setNoticeCloseHover(true)}
              onMouseLeave={() => setNoticeCloseHover(false)}
              style={{
                ...betaNoticeStyles.closeButton,
                ...(noticeCloseHover
                  ? {
                      background:
                        "linear-gradient(135deg, #4d1478 0%, #7d1456 100%)",
                      borderColor: "rgba(255,255,255,0.22)",
                      boxShadow: "0 5px 16px rgba(125,20,86,0.3)",
                      transform: "scale(1.05)",
                    }
                  : {}),
              }}
            >
              ×
            </button>
            <h2 id="beta-notice-title" style={betaNoticeStyles.title}>
              note:
            </h2>
            <p style={betaNoticeStyles.text}>
              The AI Assistant is currently in beta, so you may encounter some
              occasional issues or imperfect responses while it improves.
              <span style={betaNoticeStyles.signoff}>
                Enjoy your experience :)
              </span>
            </p>
          </div>
        </div>
      )}

      {!hasChatStarted && (
        <>
          <h2 style={styles.standaloneHeading}>
            What A-Level Maths problem can I help you solve today?
          </h2>
          <div style={styles.idleContainer}>
            <div style={styles.idleInputWrap}>
              <InputBar {...inputProps} />
            </div>
          </div>
        </>
      )}

      {hasChatStarted && (
        <div style={styles.card}>
          <div style={styles.chatHistory}>
            {messages.map((msg) =>
              msg.sender === "ai" ? (
                <AiBubble key={msg.id} msg={msg} />
              ) : (
                <UserBubble
                  key={msg.id}
                  msg={msg}
                  styles={styles}
                  isEditing={editingMessageId === msg.id}
                  onStartEdit={() => handleStartEdit(msg.id)}
                  onConfirmEdit={(newText) =>
                    handleConfirmEdit(msg.id, newText)
                  }
                  onCancelEdit={handleCancelEdit}
                />
              ),
            )}
            <div ref={chatEndRef} />
          </div>
          <InputBar {...inputProps} />
        </div>
      )}
    </div>
  );
}

export default AiAssistantPage;
