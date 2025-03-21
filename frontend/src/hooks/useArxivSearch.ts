import { useState } from "react";
import axios from "axios";

export function useArxivSearch() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endpoint = "http://localhost:8000/api/keyword/summarize";

  const searchPapers = async (
    keyword: string,
    maxResults = 2,
    maxLength = 250,
  ) => {
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(endpoint, {
        keyword,
        max_results: maxResults,
        max_length: maxLength,
      });

      setResults(response.data.posts);
      return response.data.posts;
    } catch (err) {
      console.error("Error searching papers:", err);
      setError("Failed to fetch papers. Please try again.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading, error, searchPapers };
}
