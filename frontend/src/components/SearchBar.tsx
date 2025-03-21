import { useState } from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
  minimal?: boolean;
}

export default function SearchBar({
  onSearch,
  isLoading,
  minimal = false,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (keyword.trim()) {
        onSearch(keyword);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`flex items-center border-2 border-gray-700 rounded-lg overflow-hidden bg-gray-900 ${
          minimal ? "border-opacity-50" : ""
        }`}
      >
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={minimal ? "Search..." : "Enter a research topic..."}
          className="w-full px-4 py-2 focus:outline-none bg-gray-900 text-white placeholder-gray-500"
          disabled={isLoading}
        />
        {!minimal && (
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 disabled:bg-blue-800 disabled:text-gray-300"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        )}
      </div>
    </form>
  );
}
