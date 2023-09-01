"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAutosizeTextarea } from "@/lib/hooks/use-autosize-textarea";
import { useChat } from "ai/react";
import { useRef, useState } from "react";
import ApiKeyDialog from "./api-key-dialog";
import { useToast } from "@/lib/hooks/use-toast";

const ChatAvatar = ({ type = "user" }: { type: string }) => {
  const isUser = type === "user";

  return (
    <div
      title={isUser ? type : "bot"}
      className={`flex h-8 w-8 items-center justify-center rounded ${
        isUser ? "bg-card" : "bg-primary"
      }`}
    >
      {isUser ? (
        <Icons.user width={20} height={20} />
      ) : (
        <Icons.bot className="text-card" width={20} height={20} />
      )}
    </div>
  );
};

const Chat = () => {
  const [apiKey, setApiKey] = useState("");

  const { toast } = useToast();

  const {
    messages,
    input,
    isLoading,
    stop,
    setMessages,
    handleInputChange,
    handleSubmit,
    reload,
  } = useChat({
    api: "/api/chatbot",
    body: {
      apiKey,
    },
    onError: () => {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong 🥺. Try again later.",
        variant: "destructive",
      });
    },
  });

  const clearMessages = () => {
    setMessages([]);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextarea(textareaRef.current, input);

  const endElement = useRef<HTMLDivElement>(null);
  const scrollToEnd = () => endElement.current?.scrollIntoView();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e as any);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center">
      {hasMessages && (
        <div className="sticky top-0 flex w-full justify-center bg-popover">
          <Button onClick={clearMessages} size="sm" variant="ghost">
            <Icons.delete width={14} height={14} className="mr-2" />
            Delete conversation
          </Button>
        </div>
      )}

      <div className="w-full max-w-2xl space-y-3 p-4 pb-28 sm:px-4 sm:pt-8">
        {!hasMessages ? (
          <div className="space-y-4 py-16 text-center">
            <h2 className="text-2xl">Welcome to the AI Chatbox.</h2>
            <p>The AI will answer your questions. Say something!</p>

            <ApiKeyDialog apiKey={apiKey} setApiKey={setApiKey} />
          </div>
        ) : (
          <>
            {messages.map((msg) => {
              return (
                <div key={msg.id} className="flex items-start gap-3 py-4">
                  <ChatAvatar type={msg.role} />
                  <div className="flex-1 pl-4">{msg.content}</div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="fixed bottom-0 w-full bg-gradient-to-t from-zinc-300 to-transparent dark:from-black">
        <form
          onSubmit={handleSubmit}
          className="mx-auto my-6 flex w-full max-w-2xl justify-center gap-2 rounded-lg border border-input bg-background px-3 py-2"
        >
          {isLoading && hasMessages ? (
            <Button
              onClick={stop}
              size="sm"
              variant="outline"
              className="absolute -top-5 bg-background"
            >
              <Icons.stop width={14} height={14} className="mr-2" />
              Stop Generating
            </Button>
          ) : hasMessages ? (
            <Button
              onClick={reload as () => void}
              size="sm"
              variant="outline"
              className="absolute -top-5 bg-background"
            >
              <Icons.reload width={14} height={14} className="mr-2" />
              Regenerate response
            </Button>
          ) : null}

          <Textarea
            ref={textareaRef}
            placeholder="Type something here..."
            style={{ height: 36 }}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="max-h-[30vh] resize-none overflow-hidden rounded-lg border-0 bg-background shadow-none focus-visible:ring-0"
          />

          <Button
            disabled={!input}
            type="submit"
            variant="secondary"
            className="p-2"
            aria-label="Send"
          >
            <Icons.send width={20} height={20} aria-label="Send" />
          </Button>
        </form>
      </div>

      <div ref={endElement}></div>
    </div>
  );
};

export default Chat;
