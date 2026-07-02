import React, { useState, useEffect, useRef } from "react";
import { CHAR_LIMIT } from "../common/theme";
import Lightbox from "./Lightbox";
import FileIcon from "./FileIcon";

export default function UserBubble({
  msg,
  styles,
  isEditing,
  onStartEdit,
  onConfirmEdit,
  onCancelEdit,
}) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [draftText, setDraftText] = useState(msg.text);
  const [bubbleHover, setBubbleHover] = useState(false);
  const textareaRef = useRef(null);

  const hasMedia = msg.media?.length > 0;
  const hasText = msg.text?.trim().length > 0;
  const isLong = msg.text?.length > CHAR_LIMIT;
  const displayText =
    isLong && !expanded ? msg.text.slice(0, CHAR_LIMIT) + "…" : msg.text;

  // Reset the draft to the message's current text whenever edit mode opens,
  // so reopening edit after a cancel doesn't show stale typed-but-discarded text
  useEffect(() => {
    if (isEditing) {
      setDraftText(msg.text);
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (el) {
          el.focus();
          el.selectionStart = el.selectionEnd = el.value.length;
        }
      });
    }
  }, [isEditing, msg.text]);

  const handleSave = () => {
    // Confirmed behavior: even if draftText === msg.text, this still
    // resends and triggers a fresh AI response rather than being a no-op
    onConfirmEdit(draftText);
  };

  return (
    <div
      style={{
        alignSelf: "flex-end",
        maxWidth: "75%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-end",
      }}
      onMouseEnter={() => setBubbleHover(true)}
      onMouseLeave={() => setBubbleHover(false)}
    >
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}

      {/* Media thumbnails — shown as-is regardless of edit state.
          Edit is scoped to text only; attachments aren't editable. */}
      {hasMedia && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {msg.media.map((item, idx) =>
            item.isImage ? (
              <div
                key={idx}
                style={styles.thumbCard}
                onClick={() => setLightboxItem(item)}
              >
                <img
                  src={item.url}
                  alt="attachment"
                  style={styles.thumbImage}
                />
              </div>
            ) : (
              <div
                key={idx}
                style={styles.thumbCard}
                onClick={() => setLightboxItem(item)}
              >
                <div style={styles.thumbFileInner}>
                  <FileIcon size={28} color="rgba(255,255,255,0.85)" />
                  <span style={styles.thumbFileExt}>
                    {item.name.split(".").pop().toUpperCase()}
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      )}

      {/* Edit mode: textarea replaces the text bubble. Media above is untouched. */}
      {isEditing ? (
        <div style={{ width: "100%" }}>
          <textarea
            ref={textareaRef}
            style={styles.editTextarea}
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSave();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                onCancelEdit();
              }
            }}
          />
          <div style={styles.editActionsRow}>
            <button
              type="button"
              style={styles.editButton}
              onClick={onCancelEdit}
            >
              Cancel
            </button>
            <button
              type="button"
              style={styles.editButtonPrimary}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        hasText && (
          <>
            <div style={styles.bubbleUser}>
              {displayText}
              {isLong && (
                <span
                  onClick={() => setExpanded(!expanded)}
                  style={{
                    display: "block",
                    marginTop: "6px",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {expanded ? "Show less" : "Read more"}
                </span>
              )}
            </div>

            {/* Edit trigger only shows on hover, and only while the
                message is unlocked (before its AI response has landed) */}
            {!msg.locked && bubbleHover && (
              <button
                type="button"
                style={styles.editTriggerButton}
                onClick={onStartEdit}
                aria-label="Edit message"
              >
                Edit
              </button>
            )}
          </>
        )
      )}
    </div>
  );
}
