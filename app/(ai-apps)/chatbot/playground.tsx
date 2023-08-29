"use client";

import { predictInput } from "@/lib/api";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import useAutosizeTextarea from "@/hooks/useAutosizeTextarea";

interface Response {
  role: string;
  message: string;
}

const initialState = [
  { role: "user", message: "Hi, can you help me with this problem?" },
  {
    role: "bot",
    message: "Of course, I'd be happy to help. What seems to be the issue?",
  },
  {
    role: "user",
    message: "I'm having trouble understanding this physics concept.",
  },
  {
    role: "bot",
    message:
      "Which concept is giving you trouble? I can try to explain it in simpler terms.",
  },
  {
    role: "user",
    message: "I don't understand how the wave-particle duality works.",
  },
  {
    role: "bot",
    message:
      "Wave-particle duality is a fundamental concept in quantum mechanics. Would you like me to explain it to you?",
  },
  {
    role: "user",
    message: "Yes, please. I'm trying to prepare for my physics exam.",
  },
  {
    role: "bot",
    message:
      "Okay, let me break it down for you. When observing a quantum object, it can exhibit both wave-like and particle-like behavior.",
  },
  { role: "user", message: "I think I understand it better now. Thank you!" },
  {
    role: "bot",
    message:
      "You're welcome. If you have any other questions, feel free to ask.",
  },
  { role: "user", message: "What is dark matter, and why is it important?" },
  {
    role: "bot",
    message:
      "Dark matter is a form of matter that is thought to make up a significant portion of the universe's total mass. It's important because it helps explain the observed gravitational effects on galaxies and other astronomical objects.",
  },
  { role: "user", message: "Is time travel possible?" },
  {
    role: "bot",
    message:
      "According to our current understanding of physics, time travel is not possible. However, there are some theoretical models that allow for the possibility of time travel under certain conditions.",
  },
  {
    role: "user",
    message: "What is the relationship between energy and mass?",
  },
  {
    role: "bot",
    message:
      "According to Einstein's famous equation E=mc^2, energy and mass are equivalent and can be converted from one to the other. This relationship is fundamental to our understanding of the universe.",
  },
  {
    role: "user",
    message:
      "What is the difference between classical mechanics and quantum mechanics?",
  },
  {
    role: "bot",
    message:
      "Classical mechanics is a branch of physics that studies the behavior of macroscopic objects, while quantum mechanics deals with the behavior of microscopic objects, such as atoms and subatomic particles.",
  },
  { role: "user", message: "How do black holes work?" },
  {
    role: "bot",
    message:
      "Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse under their own gravity, and their properties are governed by the laws of general relativity.",
  },
];

const Playground = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Response[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const endElement = useRef<HTMLDivElement>(null);

  useAutosizeTextarea(textareaRef.current, input);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setConversation((prev) => [...prev, { role: "user", message: input }]);

    setIsLoading(true);

    try {
      setInput("");
      const prediction = await predictInput(input);
      setConversation((prev) => [...prev, { role: "ai", message: prediction }]);
    } catch (err) {
      console.log(err);
    } finally {
      endElement.current?.scrollIntoView({ behavior: "smooth" });
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center">
      <div className="sticky top-0 flex w-full justify-center bg-secondary">
        <Button onClick={() => {}} size="sm" variant="ghost">
          Settings
        </Button>
        <Button
          onClick={() => setConversation(initialState)}
          size="sm"
          variant="ghost"
        >
          Fake
        </Button>
        <Button onClick={() => setConversation([])} size="sm" variant="ghost">
          Clear
        </Button>
      </div>

      <div className="w-full max-w-2xl space-y-3 p-4 pb-20 sm:px-4 sm:pt-8">
        {!conversation.length && (
          <div className="space-y-4 py-16 text-center">
            <h2 className="text-2xl">Welcome to the AI Chatbox.</h2>
            <p>The AI will try to answer your questions.</p>
            <Button onClick={() => textareaRef.current?.focus()}>
              Start Chatting!
            </Button>
          </div>
        )}

        {conversation.length > 0 && (
          <>
            {conversation.map((response, i) => {
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b py-4 last:border-0"
                >
                  <Avatar type={response.role} />
                  <div className="flex-1">{response.message}</div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="fixed bottom-0 w-full bg-gradient-to-t from-black to-transparent">
        <form
          onSubmit={handleSubmit}
          className="mx-auto my-6 flex max-w-2xl justify-center gap-2"
        >
          <Textarea
            ref={textareaRef}
            value={input}
            placeholder="Type something here..."
            onChange={(e) => setInput(e.target.value)}
            style={{ height: 36 }}
            className="max-h-[50vh] resize-none overflow-hidden rounded-lg bg-background focus-visible:ring-2"
            onKeyDown={handleKeyDown}
          />

          <Button
            disabled={!input.length}
            type="submit"
            variant="secondary"
            className="p-2"
          >
            <Icons.send width={20} height={20} />
          </Button>
        </form>
      </div>

      <div ref={endElement}></div>
    </div>
  );
};

const Avatar = ({ type = "user" }: { type: string }) => {
  const isUser = type === "user";
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full bg-card"
      title={isUser ? type : "bot"}
    >
      {type === "user" ? (
        <Icons.user width={20} height={20} />
      ) : (
        <Icons.bot width={20} height={20} />
      )}
    </div>
  );
};

export default Playground;
