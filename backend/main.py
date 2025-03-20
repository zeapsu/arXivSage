from fastapi import FastAPI

app = FastAPI(title="arXiv Sage API")


@app.get("/")
def read_root():
    return {"message": "Welcome to the arXiv Sage API!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
