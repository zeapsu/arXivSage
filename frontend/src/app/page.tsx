"use client";

import { useState } from "react";
import KeywordSearch from "@/components/KeywordSearch";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResultsReceived = (results: any) => {
    setSearchResults(results);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">arXiv Sage</h1>
      <p className="text-xl mb-8">
        Enter a keyword to search for research papers
      </p>
      <KeywordSearch
        onResultsReceived={handleResultsReceived}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {isLoading ? (
        <div className="mt-8">Loading papers...</div>
      ) : (
        searchResults.length > 0 && (
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <div className="space-y-4">
              {searchResults.map((result: any) => (
                <div key={result.paper_id} className="border p-4 rounded-lg">
                  <h3 className="text-xl font-medium">{result.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    By {result.authors.join(", ")} • Published{" "}
                    {result.published}
                  </p>
                  <p className="mt-2">{result.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </main>
  );
}
