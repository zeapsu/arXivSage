import { useEffect, useState } from "react";

declare global {
  interface Window {
    electron: {
      sendSearchQuery: (query: string) => void;
      onResults: (callback: (data: any) => void) => void;
    };
  }
}

interface ResultData {
  title: string;
  authors: string[];
  summary: string;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ResultData | null>(null);

  useEffect(() => {
    window.electron.onResults((data: ResultData) => {
      setResults(data);
    });
  }, []);

  const handleSearch = () => {
    if (window.electron) {
      window.electron.sendSearchQuery(query);
      console.log("Sent search query:", query);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">ArXivSage</h1>
      {/* Search Box */}
      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term..."
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Display Results */}
      <div className="mt-6 w-full max-w-2xl">
        {results ? (
          <div className="card bg-white shadow-lg p-4">
            <h2 className="text-xl font-semibold">{results.title}</h2>
            <p className="text-gray-600"><strong>Authors:</strong> {results.authors.join(", ")}</p>
            <p className="text-gray-800 mt-2">{results.summary}</p>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No results yet.</p>
        )}
      </div>
      {/* Dropdown (placeholder) */}
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">Click</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
