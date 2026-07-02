import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import {
  buildPaperUrls,
  emptyPaperUrls,
  normalizePaperFilters,
} from "../../utils/paperUrls";

export default function usePaperUrls({
  allSelected,
  selectedPaper,
  selectedSeries,
  selectedVariant,
  selectedYear,
}) {
  const [dbUrls, setDbUrls] = useState(emptyPaperUrls);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    async function getPaperUrls() {
      if (!allSelected) {
        setDbUrls(emptyPaperUrls);
        return;
      }

      const { subjectSearch, seriesSearch } = normalizePaperFilters({
        paper: selectedPaper,
        series: selectedSeries,
      });

      setLoading(true);

      const { data, error } = await supabase
        .from("papers")
        .select("qp_url, ms_url")
        .ilike("subject", `%${subjectSearch}%`)
        .eq("year", Number(selectedYear))
        .ilike("series", `%${seriesSearch}%`)
        .ilike("variant", `%${selectedVariant}%`)
        .maybeSingle();

      if (!isCurrentRequest) return;

      if (error) {
        console.error("Database fetch error:", error);
        setDbUrls(emptyPaperUrls);
      } else {
        setDbUrls(
          buildPaperUrls({
            data,
            paper: selectedPaper,
            seriesSearch,
            variant: selectedVariant,
            year: selectedYear,
          }),
        );
      }

      setLoading(false);
    }

    getPaperUrls();

    return () => {
      isCurrentRequest = false;
    };
  }, [
    allSelected,
    selectedPaper,
    selectedSeries,
    selectedVariant,
    selectedYear,
  ]);

  return { dbUrls, loading };
}
