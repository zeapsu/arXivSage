import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostProps {
  paper: {
    paper_id: string;
    title: string;
    authors: string[];
    summary: string;
    published: string;
    pdf_url?: string;
  };
}

export default function Post({ paper }: PostProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto my-4">
      {/* Header with author info */}
      <div className="p-4 flex items-center space-x-3 border-b">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
          {paper.authors[0]?.charAt(0) || "R"}
        </div>
        <div>
          <p className="font-medium text-sm">
            {paper.authors.length > 2
              ? `${paper.authors[0]} et al.`
              : paper.authors.join(", ")}
          </p>
          <p className="text-xs text-gray-500">{paper.published}</p>
        </div>
      </div>

      {/* Paper title */}
      <h3 className="px-4 pt-3 font-bold text-lg">{paper.title}</h3>

      {/* Summary content with markdown rendering */}
      <div className="p-4 prose prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Override default element styling
            p: ({ node, ...props }) => (
              <p className="mb-4 last:mb-0" {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mb-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-bold mb-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-bold mb-2" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside mb-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside mb-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            a: ({ node, ...props }) => (
              <a className="text-blue-500 hover:underline" {...props} />
            ),
            code: ({ node, inline, ...props }) =>
              inline ? (
                <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />
              ) : (
                <code
                  className="block bg-gray-100 rounded p-2 mb-4"
                  {...props}
                />
              ),
          }}
        >
          {paper.summary}
        </ReactMarkdown>
      </div>

      {/* Footer with actions */}
      <div className="px-4 py-3 border-t flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Comment</span>
          </button>
        </div>
        <a
          href={paper.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
        >
          View Full Paper
        </a>
      </div>
    </div>
  );
}
