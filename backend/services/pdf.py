import pdfplumber


class PDFService:
    @staticmethod
    def extract_text(pdf_path: str) -> str:
        """
        Extracts text from a PDF file.

        Args:
            pdf_path: Path to the PDF file.

        Returns:
            Extracted text as a single string.
        """
        all_text = ""

        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    all_text += text + "\n"

        return all_text.strip()
