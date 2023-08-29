import Playground from "@/app/(ai-apps)/chatbot/playground";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatGPT",
};

export default function ChatPage() {
  return (
    <main>
      <Playground />
    </main>
  );
}
