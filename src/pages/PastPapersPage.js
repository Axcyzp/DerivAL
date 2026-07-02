import React, { useMemo, useState } from "react";
import GlassSelect from "../components/common/GlassSelect";
import {
  PAPER_OPTIONS,
  SERIES_OPTIONS,
  VARIANT_OPTIONS,
  YEAR_OPTIONS,
} from "../constants";
import { createPaperDownloadName } from "../utils/paperUrls";
import { openExternalUrl } from "../utils/browser";
import { HeaderFileIcon } from "../components/pastPapers/icons";
import PaperViewer from "../components/pastPapers/PaperViewer";
import useIsMobile from "../components/pastPapers/useIsMobile";
import usePaperUrls from "../components/pastPapers/usePaperUrls";
import {
  PAST_PAPERS_MOBILE_STYLES,
  PAST_PAPERS_STYLES,
} from "../components/pastPapers/styles";

const mergeStyles = (base, overrides) => {
  const merged = { ...base };
  Object.entries(overrides).forEach(([key, value]) => {
    merged[key] = { ...(base[key] || {}), ...value };
  });
  return merged;
};

function PastPapersPage() {
  const [selectedPaper, setSelectedPaper] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [docType, setDocType] = useState("QP");
  const [downloading, setDownloading] = useState(false);

  const isMobile = useIsMobile();
  const S = isMobile
    ? mergeStyles(PAST_PAPERS_STYLES, PAST_PAPERS_MOBILE_STYLES)
    : PAST_PAPERS_STYLES;
  const allSelected =
    selectedPaper && selectedYear && selectedSeries && selectedVariant;

  const { dbUrls, loading } = usePaperUrls({
    allSelected,
    selectedPaper,
    selectedSeries,
    selectedVariant,
    selectedYear,
  });

  const currentRawUrl = useMemo(
    () => (docType === "QP" ? dbUrls.qp_url : dbUrls.ms_url),
    [dbUrls.ms_url, dbUrls.qp_url, docType],
  );

  const handleDownload = async () => {
    if (downloading || !currentRawUrl) return;

    setDownloading(true);

    try {
      const res = await fetch(currentRawUrl.trim());
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = createPaperDownloadName({
        docType,
        paper: selectedPaper,
        series: selectedSeries,
        variant: selectedVariant,
        year: selectedYear,
      });

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      openExternalUrl(currentRawUrl);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={S.panel}>
      <h2 style={S.heading}>
        <HeaderFileIcon />
        Past Papers Hub
      </h2>

      <p style={S.intro}>
        Select your module, year, series, and variant below to load your
        specific exam paper instantly.
      </p>

      <div style={S.filters}>
        <GlassSelect
          placeholder="-- Select Paper --"
          value={selectedPaper}
          options={PAPER_OPTIONS}
          onChange={setSelectedPaper}
          minWidth={isMobile ? "100%" : undefined}
        />
        <GlassSelect
          placeholder="-- Select Year --"
          value={selectedYear}
          options={YEAR_OPTIONS}
          onChange={setSelectedYear}
          minWidth={isMobile ? "100%" : undefined}
        />
        <GlassSelect
          placeholder="-- Select Series --"
          value={selectedSeries}
          options={SERIES_OPTIONS}
          onChange={setSelectedSeries}
          minWidth={isMobile ? "100%" : undefined}
        />
        <GlassSelect
          placeholder="-- Variant --"
          value={selectedVariant}
          options={VARIANT_OPTIONS}
          onChange={setSelectedVariant}
          minWidth={isMobile ? "100%" : undefined}
        />
      </div>

      {allSelected ? (
        <PaperViewer
          currentRawUrl={currentRawUrl}
          docType={docType}
          downloading={downloading}
          isMobile={isMobile}
          loading={loading}
          onDownload={handleDownload}
          selectedPaper={selectedPaper}
          selectedSeries={selectedSeries}
          selectedVariant={selectedVariant}
          selectedYear={selectedYear}
          setDocType={setDocType}
          styles={S}
        />
      ) : (
        <div style={S.emptyState}>
          <p style={S.emptyText}>
            Please select a paper, year, series, and variant to launch the
            document viewer.
          </p>
        </div>
      )}
    </div>
  );
}

export default PastPapersPage;
