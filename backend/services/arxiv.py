import os
from typing import Any, Dict, List

import arxiv


class ArxivService:
    def __init__(self):
        self.client = arxiv.Client()

    def search_papers(
        self, keyword: str, max_results: int = 10
    ) -> List[Dict[Any, Any]]:
        """

        Search arXiv for papers matching the given keyword

        Args:
            keyword: The search term
            max_results: Maximum number of results to return (default: 10)

        Returns:
            List of paper metadata dictionaries

        """

        # create a search query
        search = arxiv.Search(
            query=keyword,
            max_results=max_results,
            sort_by=arxiv.SortCriterion.SubmittedDate,
            sort_order=arxiv.SortOrder.Descending,
        )

        # execute the search and convert results into dictionaries
        results = []
        for paper in self.client.results(search):
            results.append(
                {
                    "title": paper.title,
                    "authors": [author.name for author in paper.authors],
                    "summary": paper.summary,
                    "published": paper.published.strftime("%Y-%m-%d"),
                    "updated": paper.updated.strftime("%Y-%m-%d"),
                    "pdf_url": paper.pdf_url,
                    "entry_id": paper.entry_id,
                    "doi": paper.doi,
                }
            )

        return results

    def get_paper_by_id(self, paper_id: str) -> Dict[Any, Any]:
        """
        Retrieve a specific paper by its arXiv ID

        Args:
            paper_id: The arXiv ID of the paper

        Returns:
            Paper metadata as a dictionary
        """

        search = arxiv.Search(id_list=[paper_id])
        paper = next(self.client.results(search))

        return {
            "title": paper.title,
            "authors": [author.name for author in paper.authors],
            "summary": paper.summary,
            "published": paper.published.strftime("%Y-%m-%d"),
            "updated": paper.updated.strftime("%Y-%m-%d"),
            "pdf_url": paper.pdf_url,
            "entry_id": paper.entry_id,
            "doi": paper.doi,
        }

    def download_pdf(self, paper_id: str, dirpath: str = "./pdfs") -> str:
        """
        Downloads the PDF of a paper given its arXiv ID.

        Args:
            paper_id: The arXiv ID of the paper.
            dirpath: Directory where the PDF will be saved.

        Returns:
            The file path of the downloaded PDF.
        """
        if not os.path.exists(dirpath):
            os.makedirs(dirpath)

        search = arxiv.Search(id_list=[paper_id])
        paper = next(self.client.results(search))

        filename = f"{paper_id.replace('/', '_')}.pdf"
        filepath = os.path.join(dirpath, filename)

        # Download the PDF
        paper.download_pdf(dirpath=dirpath, filename=filename)

        return filepath
