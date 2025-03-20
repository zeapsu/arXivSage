<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# 

---

# arXiv Sage: AI-Powered Research Summarizer

arXiv Sage is a desktop application that transforms complex research papers into engaging, Instagram-style summaries. Simply enter a keyword, and the app fetches the latest papers from arXiv, summarizes them using DeepSeek AI, and presents them in a beautiful feed interface.

## Features

- **Research Made Accessible**: Search arXiv's vast repository with simple keywords
- **AI-Powered Summaries**: Automatically transform dense research papers into concise, engaging summaries
- **Instagram-Style Feed**: Browse summaries in a familiar, visually appealing format
- **Desktop Application**: Convenient Electron-based app for Windows, Mac, and Linux


## Tech Stack

### Frontend

- **Next.js**: React framework for building the user interface
- **Electron**: Wraps the web app into a desktop application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Component Library**: UI components for consistent design


### Backend

- **FastAPI**: High-performance Python web framework
- **arXiv API**: Integration for fetching research papers
- **PDF Processing**: Extraction of text from research PDFs
- **DeepSeek API**: AI-powered text summarization


## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn


### Backend Setup

1. Create a Python virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install backend dependencies:

```bash
pip install fastapi uvicorn pydantic requests pymupdf
```

3. Set up environment variables:

```bash
# Create a .env file in the backend directory
DEEPSEEK_API_KEY=your_deepseek_api_key
```

4. Start the FastAPI server:

```bash
uvicorn main:app --reload
```


### Frontend Setup

1. Install frontend dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

3. For Electron development:

```bash
npm run electron-dev
# or
yarn electron-dev
```


## Building for Production

### Package the Electron App

```bash
npm run build
npm run electron-pack
# or
yarn build
yarn electron-pack
```

This will create distributable packages in the `dist` folder for your platform.

## Project Structure

```
arXiv-sage/
├── backend/               # FastAPI backend
│   ├── main.py            # Main FastAPI application
│   ├── models.py          # Pydantic models
│   ├── services/          # Business logic
│   │   ├── arxiv.py       # arXiv API integration
│   │   ├── pdf.py         # PDF processing
│   │   └── summarizer.py  # DeepSeek API integration
│   └── requirements.txt   # Python dependencies
├── frontend/              # Next.js + Electron frontend
│   ├── components/        # React components
│   ├── pages/             # Next.js pages
│   ├── public/            # Static assets
│   ├── styles/            # Tailwind and CSS styles
│   ├── electron/          # Electron configuration
│   └── package.json       # Node.js dependencies
└── README.md              # Project documentation
```


## Future Extensions

- Local ML model integration for offline summarization
- Custom summarization styles (academic, ELI5, etc.)
- Citation extraction and management
- Collaborative features for research teams


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

