import Post from "./Post";
import { useEffect, useRef } from "react";

interface FeedProps {
  papers: any[];
  setActivePost: (id: string) => void;
}

export default function Feed({ papers, setActivePost }: FeedProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up intersection observer to track which post is currently in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePost(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    // Observe all post elements
    const postElements = document.querySelectorAll(".post-item");
    postElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [papers, setActivePost]);

  if (papers.length === 0) {
    return <p className="text-center text-gray-500">No papers found</p>;
  }

  return (
    <div className="space-y-6">
      {papers.map((paper) => (
        <div key={paper.paper_id} id={paper.paper_id} className="post-item">
          <Post paper={paper} />
        </div>
      ))}
    </div>
  );
}
