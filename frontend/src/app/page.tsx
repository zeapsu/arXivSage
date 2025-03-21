"use client";

import { useState } from "react";
import KeywordSearch from "../components/KeywordSearch";
import Post from "../components/Post";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleResultsReceived = (results: any) => {
    setSearchResults(results);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
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
        <div className="mt-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">
            Searching and summarizing papers...
          </p>
        </div>
      ) : (
        searchResults.length > 0 && (
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Research Summaries</h2>
            <div className="space-y-6">
              {searchResults.map((result: any) => (
                <Post key={result.paper_id} paper={result} />
              ))}
            </div>
          </div>
        )
      )}
    </main>
  );
}
