import React, { useState } from "react";
import { openExternalUrl } from "../../utils/browser";
import { MobileFileIcon } from "./icons";
import {
  DOC_TYPES,
  docTypeButtonStyle,
  downloadButtonStyle,
  mobileViewButtonStyle,
} from "./styles";

function MobilePaperViewer({
  currentRawUrl,
  docType,
  downloading,
  onDownload,
  selectedPaper,
  selectedSeries,
  selectedVariant,
  selectedYear,
  styles: S,
}) {
  const [viewHover, setViewHover] = useState(false);

  return (
    <div style={S.mobileViewer}>
      <div style={S.mobileIconFrame}>
        <MobileFileIcon />
      </div>

      <div>
        <div style={S.mobilePaperTitle}>
          {selectedPaper} - {docType}
        </div>
        <div style={S.mobilePaperMeta}>
          Variant {selectedVariant} ({selectedSeries} {selectedYear})
        </div>
      </div>

      <div style={S.mobileActions}>
        <button
          onClick={() => openExternalUrl(currentRawUrl)}
          onMouseEnter={() => setViewHover(true)}
          onMouseLeave={() => setViewHover(false)}
          style={mobileViewButtonStyle(viewHover)}
        >
          Open & View PDF
        </button>

        <button
          onClick={onDownload}
          disabled={downloading}
          style={S.mobileSaveButton}
        >
          {downloading ? "Downloading..." : "Save Offline Copy"}
        </button>
      </div>
    </div>
  );
}

export default function PaperViewer({
  currentRawUrl,
  docType,
  downloading,
  isMobile,
  loading,
  onDownload,
  selectedPaper,
  selectedSeries,
  selectedVariant,
  selectedYear,
  setDocType,
  styles: S,
}) {
  const [downloadHover, setDownloadHover] = useState(false);

  return (
    <div style={S.viewerShell}>
      <div style={S.viewerHeader}>
        <span style={S.viewerTitle}>
          Viewing {docType}: {selectedPaper} / {selectedSeries} {selectedYear} /
          Variant {selectedVariant}
        </span>

        <div style={S.viewerActions}>
          <div style={S.toggleGroup}>
            {DOC_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setDocType(type)}
                style={docTypeButtonStyle(docType === type, isMobile)}
              >
                {type}
              </button>
            ))}
          </div>

          {!isMobile && (
            <button
              onClick={onDownload}
              onMouseEnter={() => setDownloadHover(true)}
              onMouseLeave={() => setDownloadHover(false)}
              disabled={downloading || !currentRawUrl}
              style={downloadButtonStyle(downloadHover, isMobile)}
            >
              Download {docType}
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div style={S.loadingState}>Loading paper from database...</div>
      ) : currentRawUrl ? (
        isMobile ? (
          <MobilePaperViewer
            currentRawUrl={currentRawUrl}
            docType={docType}
            downloading={downloading}
            onDownload={onDownload}
            selectedPaper={selectedPaper}
            selectedSeries={selectedSeries}
            selectedVariant={selectedVariant}
            selectedYear={selectedYear}
            styles={S}
          />
        ) : (
          <iframe
            src={currentRawUrl}
            title={`Past Paper ${docType} Viewer`}
            style={S.iframe}
          />
        )
      ) : (
        <div style={S.missingState}>Document not found in database registry.</div>
      )}
    </div>
  );
}
