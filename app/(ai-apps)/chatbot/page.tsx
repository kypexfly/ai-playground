import Chat from "@/app/(ai-apps)/chatbot/Chat";
import { apps } from "@/config/apps";
import { Metadata } from "next";

const app = apps.find((element) => element.href === "/chatbot")

export const metadata: Metadata = {
  title: app?.title,
  description: app?.description
};

export default function ChatPage() {
  return (
    <main>
      <Chat />
    </main>
  );
}
