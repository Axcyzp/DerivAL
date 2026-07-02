import { PUBLIC_PAPER_ROOT } from "../config/env";

const SUBJECT_SEARCH_MAP = {
  M1: "P4",
  S1: "P5",
};

const SERIES_SEARCH_MAP = {
  "May/June": "June",
  "Oct/Nov": "November",
};

export const emptyPaperUrls = { qp_url: "", ms_url: "" };

export function normalizePaperFilters({ paper, series }) {
  return {
    subjectSearch: SUBJECT_SEARCH_MAP[paper] || paper,
    seriesSearch: SERIES_SEARCH_MAP[series] || series,
  };
}

function getFileName(path) {
  return path ? path.split("/").pop() : "";
}

function buildPaperUrl({ fileName, paper, seriesSearch, variant, year }) {
  if (!fileName) return "";

  const path = [
    PUBLIC_PAPER_ROOT,
    year,
    `${year} ${seriesSearch}`,
    paper,
    `V${variant}`,
    fileName,
  ].join("/");

  return encodeURI(path);
}

export function buildPaperUrls({ data, paper, seriesSearch, variant, year }) {
  if (!data) return emptyPaperUrls;

  return {
    qp_url: buildPaperUrl({
      fileName: getFileName(data.qp_url),
      paper,
      seriesSearch,
      variant,
      year,
    }),
    ms_url: buildPaperUrl({
      fileName: getFileName(data.ms_url),
      paper,
      seriesSearch,
      variant,
      year,
    }),
  };
}

export function createPaperDownloadName({
  docType,
  paper,
  series,
  variant,
  year,
}) {
  const safeSeries = series.replace("/", "-");
  return `${paper}_${safeSeries}_${year}_V${variant}_${docType}.pdf`;
}
