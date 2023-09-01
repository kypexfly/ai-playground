import { apps } from "@/config/apps";
import { Metadata } from "next";
import AskPDF from "./AskPDF";

const app = apps.find((element) => element.href === "/ask-pdf");

export const metadata: Metadata = {
  title: app?.title,
  description: app?.description,
};

export default function PDFPage() {
  return (
    <main className="container p-0">
      <AskPDF />
    </main>
  );
}
