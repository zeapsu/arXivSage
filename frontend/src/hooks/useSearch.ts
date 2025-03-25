import { useState } from "react";
import { useArxivSearch } from "@/hooks/useArxivSearch";

export function useSearch() {
  const { results, isLoading, error, searchPapers } = useArxivSearch();
  const [hasSearched, setHasSearched] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [activePost, setActivePost] = useState("");

  const handleSearch = async (keyword: string) => {
    await searchPapers(keyword);
    setHasSearched(true);
    setCurrentKeyword(keyword);
  };

  const resetSearch = () => {
    setHasSearched(false);
    setCurrentKeyword("");
  };

  return {
    results,
    isLoading,
    error,
    hasSearched,
    currentKeyword,
    activePost,
    setActivePost,
    handleSearch,
    resetSearch,
  };
}
