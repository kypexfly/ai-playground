import Chat from "@/app/(ai-apps)/chatbot/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatGPT",
};

export default function ChatPage() {
  return (
    <main>
      <Chat />
    </main>
  );
}
