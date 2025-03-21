import os

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from services.arxiv import ArxivService
from services.pdf import PDFService
from services.summarizer import DeepSeekService

load_dotenv()

app = FastAPI(title="arXiv Sage API")

# initialize the arXiv service
arxiv_service = ArxivService()


# Dependency to get DeepSeek service
def get_deepseek_service():
    api_key = os.getenv("DEEPSEEK_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="DeepSeek API key not configured")

    return DeepSeekService(api_key=api_key)


class SearchRequest(BaseModel):
    keyword: str
    max_results: int = 10


class SummarizeRequest(BaseModel):
    paper_id: str
    max_length: int = 500


class KeywordSummaryRequest(BaseModel):
    keyword: str
    max_results: int = 5
    max_length: int = 500


@app.post("/api/search")
def search_papers(request: SearchRequest):
    """
    Endpoint to search for papers on arXiv based on a keyword.

    Args:
        request: A SearchRequest object containing the keyword and max_results.

    Returns:
        A list of paper metadata dictionaries.
    """
    if not request.keyword:
        raise HTTPException(status_code=400, detail="Keyword is required")

    try:
        results = arxiv_service.search_papers(request.keyword, request.max_results)
        return {"papers": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching arXiv: {str(e)}")


@app.post("/api/paper/summarize")
def summarize_paper(
    request: SummarizeRequest,
    deepseek_service: DeepSeekService = Depends(get_deepseek_service),
):
    """
    Downloads a paper's PDF from arXiv, extracts its text,
    and generates an Instagram-style summary.
    """
    try:
        # Download PDF
        pdf_path = arxiv_service.download_pdf(request.paper_id)

        # Extract text
        extracted_text = PDFService.extract_text(pdf_path)

        # Summarize text
        summary = deepseek_service.summarize_text(
            text=extracted_text, max_length=request.max_length
        )

        if summary is None:
            # Handle the None case
            raise HTTPException(status_code=500, detail="Failed to generate summary")

        # Get paper metadata
        paper_metadata = arxiv_service.get_paper_by_id(request.paper_id)

        return {
            "paper_id": request.paper_id,
            "title": paper_metadata["title"],
            "authors": paper_metadata["authors"],
            "summary": summary,
            "published": paper_metadata["published"],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing paper: {str(e)}")


@app.post("/api/keyword/summarize")
def summarize_by_keyword(
    request: KeywordSummaryRequest,
    deepseek_service: DeepSeekService = Depends(get_deepseek_service),
):
    """
    Searches for papers based on keyword, downloads PDFs, and returns summarized posts.

    This endpoint combines search, download, extraction, and summarization in one call.
    """
    if not request.keyword:
        raise HTTPException(status_code=400, detail="Keyword is required")

    try:
        # Search for papers
        papers = arxiv_service.search_papers(request.keyword, request.max_results)
        # Process each paper
        summarized_posts = []

        for paper in papers:
            paper_id = paper["entry_id"].split("/")[-1]  # Extract arXiv ID

            try:
                # Download PDF
                pdf_path = arxiv_service.download_pdf(paper_id)

                # Extract text
                extracted_text = PDFService.extract_text(pdf_path)

                # Summarize text
                summary = deepseek_service.summarize_text(
                    text=extracted_text, max_length=request.max_length
                )

                if summary is None:
                    # Skip papers that fail to summarize
                    continue

                # Add to results
                summarized_posts.append(
                    {
                        "paper_id": paper_id,
                        "title": paper["title"],
                        "authors": paper["authors"],
                        "summary": summary,
                        "published": paper["published"],
                        "pdf_url": paper["pdf_url"],
                    }
                )

            except Exception as e:
                # Log the error but continue processing other papers
                print(f"Error processing paper {paper_id}: {str(e)}")
                continue

        return {"posts": summarized_posts}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing keyword search: {str(e)}"
        )


@app.get("/api/paper/{paper_id}")
def get_paper(paper_id: str):
    """
    Endpoint to retrieve a specific paper by its arXiv ID.
    """
    try:
        paper = arxiv_service.get_paper_by_id(paper_id)
        return paper
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Paper not found: {str(e)}")


@app.get("/api/paper/{paper_id}/extract")
def download_and_extract(paper_id: str):
    """
    Downloads a paper's PDF from arXiv and extracts its text.
    """
    try:
        # Download PDF
        pdf_path = arxiv_service.download_pdf(paper_id)

        # Extract text
        extracted_text = PDFService.extract_text(pdf_path)

        return {"paper_id": paper_id, "text": extracted_text, "pdf_path": pdf_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing paper: {str(e)}")


@app.get("/")
def read_root():
    return {"message": "Welcome to the arXiv Sage API!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
