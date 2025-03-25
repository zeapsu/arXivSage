"use client";

import { useEffect } from "react";
import { Command } from "@tauri-apps/plugin-shell";
import SearchBar from "@/components/SearchBar";
import Feed from "@/components/Feed";
import LoadingSpinner from "@/components/LoadingSpinner";
import TableOfContents from "@/components/TableOfContents";
import { useSearch } from "@/hooks/useSearch";

export default function Home() {
  useEffect(() => {
    async function startFastAPIServer() {
      try {
        // Use Command.sidecar() to execute the sidecar binary
        const command = Command.sidecar("binaries/main"); // Path to your FastAPI binary relative to src-tauri
        const output = await command.spawn(); // Start the sidecar process
        console.log("FastAPI server started:", output);
      } catch (error) {
        console.error("Failed to start FastAPI server:", error);
      }
    }

    startFastAPIServer();
  }, []);

  const {
    results,
    isLoading,
    error,
    hasSearched,
    currentKeyword,
    activePost,
    setActivePost,
    handleSearch,
    resetSearch,
  } = useSearch();

  // Initial search page layout
  if (!hasSearched) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">arXiv Sage</h1>
        <p className="text-xl mb-8 text-gray-300">
          Enter a keyword to search for research papers
        </p>
        <div className="w-full max-w-md">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            minimal={false}
          />
        </div>
        {isLoading && (
          <LoadingSpinner
            message={
              results.length > 0
                ? "Updating results..."
                : "Searching and summarizing papers..."
            }
          />
        )}
      </div>
    );
  }

  // Results page layout with fixed header
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed header that appears after search */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-black h-16 flex items-center px-4 shadow-md">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <button
            onClick={resetSearch}
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            arXiv Sage
          </button>
          <div className="w-64">
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
              minimal={true}
            />
          </div>
        </div>
      </header>

      {/* Main content with padding for fixed header */}
      <main className="pt-24 px-8 pb-8 flex">
        {/* Feed content */}
        <div className="w-full max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <p className="text-red-400 text-center mt-8">{error}</p>
          ) : results.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Research Summaries: {currentKeyword}
              </h2>
              <Feed papers={results} setActivePost={setActivePost} />
            </>
          ) : (
            <p className="text-center text-gray-400 mt-8">No results found</p>
          )}
        </div>

        {/* Table of Contents */}
        {results.length > 0 && (
          <div className="hidden lg:block w-64 fixed right-8 top-24">
            <TableOfContents papers={results} activePost={activePost} />
          </div>
        )}
      </main>
    </div>
  );
}
