import React, { useRef, useEffect, useState } from "react";
import AddMediaMenu from "./inputBar/AddMediaMenu";
import AttachmentPreviewList from "./inputBar/AttachmentPreviewList";
import SendOrStopButton from "./inputBar/SendOrStopButton";
import useIsMobileDevice from "./inputBar/useIsMobileDevice";

export default function InputBar({
  styles,
  showMenu,
  setShowMenu,
  photoHover,
  setPhotoHover,
  plusHover,
  setPlusHover,
  setSendHover,
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
  extraStyle = {},
}) {
  const cameraInputRef = useRef(null);
  const plusButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const isMobileDevice = useIsMobileDevice();
  const [menuPosition, setMenuPosition] = useState({ bottom: 0, left: 0 });

  // The menu is portaled to document.body, so click-away handling must check
  // both the button in this component and the detached menu node.
  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e) => {
      const clickedButton =
        plusButtonRef.current && plusButtonRef.current.contains(e.target);
      const clickedDropdown =
        dropdownRef.current && dropdownRef.current.contains(e.target);
      if (!clickedButton && !clickedDropdown) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu, setShowMenu]);

  const handleTogglePlus = () => {
    if (!showMenu && plusButtonRef.current) {
      const rect = plusButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        bottom: window.innerHeight - rect.top + 10,
        left: rect.left,
      });
    }
    setShowMenu((prev) => !prev);
  };

  const handleSelectAddPhotos = () => {
    setShowMenu(false);
    photoInputRef.current?.click();
  };

  const handleSelectTakePhoto = () => {
    setShowMenu(false);
    cameraInputRef.current?.click();
  };

  return (
    <div style={{ ...styles.dockArea, ...extraStyle }}>
      <style>{`
        @keyframes menuPopIn {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handlePhotoChange}
      />

      {/* capture="environment" is useful on phones/tablets but ignored by
          desktop file pickers, so the camera input only exists on mobile. */}
      {isMobileDevice && (
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
      )}

      <AddMediaMenu
        dropdownRef={dropdownRef}
        isMobileDevice={isMobileDevice}
        menuPosition={menuPosition}
        onSelectAddPhotos={handleSelectAddPhotos}
        onSelectTakePhoto={handleSelectTakePhoto}
        photoHover={photoHover}
        setPhotoHover={setPhotoHover}
        showMenu={showMenu}
      />

      <form
        onSubmit={handleSendMessage}
        style={{
          ...styles.unifiedForm,
          borderRadius: attachments.length > 0 ? "24px" : "30px",
        }}
      >
        <AttachmentPreviewList
          attachments={attachments}
          removeAttachment={removeAttachment}
          styles={styles}
        />

        <div style={styles.inputRow}>
          <button
            ref={plusButtonRef}
            type="button"
            style={{
              ...styles.plusButton,
              transform: showMenu
                ? "scale(1.06) rotate(45deg)"
                : plusHover
                  ? "scale(1.06) rotate(0deg)"
                  : "scale(1) rotate(0deg)",
            }}
            onMouseEnter={() => setPlusHover(true)}
            onMouseLeave={() => setPlusHover(false)}
            onClick={handleTogglePlus}
          >
            +
          </button>

          <textarea
            style={{
              ...styles.textInput,
              resize: "none",
              overflowY: "auto",
              minHeight: styles.textareaMinHeight || "24px",
              maxHeight: "120px",
              paddingRight: "8px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.15) transparent",
            }}
            placeholder="Write a message..."
            value={inputValue}
            rows={1}
            onChange={(e) => {
              setInputValue(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />

          <SendOrStopButton
            handleStopGenerating={handleStopGenerating}
            isGenerating={isGenerating}
            setSendHover={setSendHover}
            styles={styles}
          />
        </div>
      </form>
    </div>
  );
}
