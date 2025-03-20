from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.arxiv import ArxivService
from services.pdf import PDFService

app = FastAPI(title="arXiv Sage API")

# initialize the arXiv service
arxiv_service = ArxivService()


class SearchRequest(BaseModel):
    keyword: str
    max_results: int = 10


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
