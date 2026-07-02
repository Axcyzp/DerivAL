import React, { useState } from "react";
import { createPortal } from "react-dom";
import { createDropdownStyles } from "./dropdownStyles";

function AddPhotosIcon({ hovered, dropdownStyles }) {
  return (
    <span style={dropdownStyles.iconWrap(hovered)}>
      <svg viewBox="0 0 24 24" style={dropdownStyles.icon(hovered)}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </span>
  );
}

function CameraIcon({ hovered, dropdownStyles }) {
  return (
    <span style={dropdownStyles.iconWrap(hovered)}>
      <svg viewBox="0 0 24 24" style={dropdownStyles.icon(hovered)}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    </span>
  );
}

export default function AddMediaMenu({
  dropdownRef,
  isMobileDevice,
  menuPosition,
  onSelectAddPhotos,
  onSelectTakePhoto,
  photoHover,
  setPhotoHover,
  showMenu,
}) {
  const [cameraHover, setCameraHover] = useState(false);
  if (!showMenu) return null;

  const dropdownStyles = createDropdownStyles(menuPosition);

  return createPortal(
    <div ref={dropdownRef} style={dropdownStyles.container}>
      <div
        style={dropdownStyles.item(photoHover)}
        onMouseEnter={() => setPhotoHover(true)}
        onMouseLeave={() => setPhotoHover(false)}
        onClick={onSelectAddPhotos}
      >
        <AddPhotosIcon hovered={photoHover} dropdownStyles={dropdownStyles} />
        Add Photos
      </div>

      {isMobileDevice && (
        <div
          style={dropdownStyles.item(cameraHover)}
          onMouseEnter={() => setCameraHover(true)}
          onMouseLeave={() => setCameraHover(false)}
          onClick={onSelectTakePhoto}
        >
          <CameraIcon hovered={cameraHover} dropdownStyles={dropdownStyles} />
          Take Photo
        </div>
      )}
    </div>,
    document.body,
  );
}
