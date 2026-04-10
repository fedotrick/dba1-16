from pypdf import PdfReader
import sys

def extract_pages(pdf_path, start=0, end=None):
    reader = PdfReader(pdf_path)
    total = len(reader.pages)
    if end is None or end > total:
        end = total
    for i in range(start, end):
        print(f"\n{'='*60}")
        print(f"=== PAGE {i+1} of {total} ===")
        print(f"{'='*60}")
        text = reader.pages[i].extract_text()
        if text:
            print(text)
        else:
            print("[NO TEXT EXTRACTED]")

if __name__ == "__main__":
    pdf_file = sys.argv[1] if len(sys.argv) > 1 else "dba1_student_guide.pdf"
    start = int(sys.argv[2]) - 1 if len(sys.argv) > 2 else 0
    end = int(sys.argv[3]) if len(sys.argv) > 3 else None
    extract_pages(pdf_file, start, end)
