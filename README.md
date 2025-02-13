# ArXivSage

## Overview
ArXivSage is a desktop application that allows users to search for research papers on arXiv, process their content using DeepSeek API, and display summarized results in a modern, user-friendly interface. The application is built using Django for the backend and Electron-Vite with React for the frontend, providing a seamless and efficient research discovery experience.

## Features
- **Search Functionality**: Enter a keyword to fetch research papers from arXiv.
- **Automated Summarization**: Uses DeepSeek API to extract key information from papers.
- **Modern UI**: Built with TailwindCSS and DaisyUI for a clean, responsive experience.
- **Cross-Platform Support**: Runs on Windows, macOS, and Linux using Electron.
- **Efficient Data Processing**: Uses Django and Python libraries for scraping and summarization.

## Technologies Used
### Backend:
- **Django** – REST API framework.
- **Django REST Framework (DRF)** – API development.
- **arxiv Python package** – Fetching papers from arXiv.
- **DeepSeek API** – AI-powered summarization.
- **Pipenv** – Dependency management.

### Frontend:
- **Electron-Vite** – Modern Electron framework for desktop apps.
- **React (TypeScript)** – UI framework.
- **TailwindCSS + DaisyUI** – Quick and elegant styling.

## Installation
### Prerequisites:
- Node.js & npm
- Python & Pipenv

### Setup
#### Backend (Django)
```sh
cd arxivsage-backend
pipenv install
pipenv shell
python manage.py runserver
```

#### Frontend (Electron-Vite)
```sh
cd arxivsage-ui
npm install
npm run dev
```

## Usage
1. Start the backend (`python manage.py runserver`).
2. Start the frontend (`npm run dev`).
3. Enter a keyword in the search bar.
4. View summarized research papers in a user-friendly feed.

## Contributing
Contributions are welcome! If you'd like to improve ArXivSage, feel free to fork the repository, create a new branch, and submit a pull request.

## License
This project is licensed under the MIT License.

