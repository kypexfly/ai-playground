"use client";

import { Button } from "@/components/ui/button";
import { PDFPage } from "@/lib/types";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const newChat = async (documents: PDFPage[]) => {
  try {
    const response = await fetch("/api/ask-pdf/new", {
      method: "POST",
      body: JSON.stringify(documents),
    });

    if (response.ok) {
      return (await response.json()) as {
        success: boolean;
        chatId: string | null;
      };
    }

    return null;
  } catch (e) {
    console.error(e);

    return null;
  }
};

async function extractPageText(page: any) {
  const textContent = await page.getTextContent();

  let lastY,
    text = "";

  for (let item of textContent.items) {
    if (lastY == item.transform[5] || !lastY) {
      text += item.str;
    } else {
      text += "\n" + item.str;
    }

    lastY = item.transform[5];
  }

  return text;
}

async function processDocument(document: any, onEndCallback?: () => void) {
  const pages: PDFPage[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber++) {
    const page = await document.getPage(pageNumber);
    const pageText = await extractPageText(page);

    pages.push({
      text: pageText,
      page: pageNumber,
    });
  }

  onEndCallback?.();

  return await newChat(pages);
}

const AskPDF = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handlePrevPage = () => {
    if (pageNumber <= 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber >= numPages!) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files.item(0);

    if (file) {
      setPdfFile(file);
    }
  };

  async function onDocumentLoadSuccess(document: any) {
    setNumPages(document.numPages);
    // TODO: uncomment the line to upload the data
    // const value = await processDocument(document);
  }

  const onDocumentLoadError = () => {};

  return (
    <div>
      <input
        name="pdf"
        type="file"
        accept="application/pdf"
        onChange={uploadFile}
      />

      {pdfFile && (
        <div className="max-w-2xl">
          <Document
            file={pdfFile}
            onLoadError={onDocumentLoadError}
            onLoadSuccess={onDocumentLoadSuccess}
            className="mx-auto"
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
          <div className="mt-2 flex items-center justify-between border-2 bg-secondary p-2">
            <Button onClick={handlePrevPage} disabled={pageNumber <= 1}>
              Prev
            </Button>

            <div>
              Page {pageNumber} of {numPages}
            </div>

            <Button onClick={handleNextPage} disabled={pageNumber >= numPages!}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskPDF;
