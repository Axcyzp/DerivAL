import React from "react";

export default function AttachmentPreviewList({
  attachments,
  removeAttachment,
  styles,
}) {
  if (attachments.length === 0) return null;

  return (
    <div style={styles.previewArea}>
      {attachments.map((item, i) => (
        <div key={i} style={styles.previewCard}>
          <img src={item.url} alt="upload preview" style={styles.previewImage} />
          <div style={styles.previewCardOverlay}>
            <span style={styles.previewNameText}>{item.name}</span>
          </div>
          <button
            type="button"
            style={styles.closePreviewButton}
            onClick={() => removeAttachment(i)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
