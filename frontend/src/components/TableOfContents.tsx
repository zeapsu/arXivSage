interface TableOfContentsProps {
  papers: any[];
  activePost: string;
}

export default function TableOfContents({
  papers,
  activePost,
}: TableOfContentsProps) {
  const scrollToPost = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="text-white">
      <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
      <ul className="space-y-2 list-disc pl-5">
        {papers.map((paper) => (
          <li key={paper.paper_id}>
            <button
              onClick={() => scrollToPost(paper.paper_id)}
              className={`text-left w-full py-1 hover:text-blue-400 transition-colors ${
                activePost === paper.paper_id
                  ? "text-blue-400"
                  : "text-gray-300"
              }`}
            >
              {paper.title.length > 40
                ? paper.title.substring(0, 40) + "..."
                : paper.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
