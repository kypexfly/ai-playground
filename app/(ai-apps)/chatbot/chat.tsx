"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAutosizeTextarea from "@/lib/hooks/useAutosizeTextarea";
import { useChat } from "ai/react";
import { FormEvent, useRef } from "react";

const Chat = () => {
  const {
    messages,
    input,
    stop,
    isLoading,
    setMessages,
    handleInputChange,
    handleSubmit,
    reload,
  } = useChat({
    api: "/api/chat",
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const endElement = useRef<HTMLDivElement>(null);

  console.log(messages);

  useAutosizeTextarea(textareaRef.current, input);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center">
      <div className="sticky top-0 flex w-full justify-center bg-secondary">
        {isLoading && (
          <Button onClick={stop} size="sm" variant="ghost">
            Stop
          </Button>
        )}
        {messages.length > 0 && (
          <>
            <Button onClick={() => setMessages([])} size="sm" variant="ghost">
              Clear
            </Button>
            <Button onClick={() => reload()} size="sm" variant="ghost">
              <Icons.reload width={14} height={14} className="mr-2" /> Reload
            </Button>
          </>
        )}
      </div>

      <div className="w-full max-w-2xl space-y-3 p-4 pb-20 sm:px-4 sm:pt-8">
        {!messages.length && (
          <div className="space-y-4 py-16 text-center">
            <h2 className="text-2xl">Welcome to the AI Chatbox.</h2>
            <p>The AI will try to answer your questions.</p>
            <Button onClick={() => textareaRef.current?.focus()}>
              Start Chatting!
            </Button>
          </div>
        )}

        {messages.length > 0 && (
          <>
            {messages.map((msg) => {
              return (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 border-b py-4 last:border-0"
                >
                  <Avatar type={msg.role} />

                  <div className="flex-1">{msg.content}</div>
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
            onChange={handleInputChange}
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
      className={`flex h-8 w-8 items-center justify-center rounded ${
        isUser ? "bg-card" : "bg-primary"
      }`}
      title={isUser ? type : "bot"}
    >
      {type === "user" ? (
        <Icons.user width={20} height={20} />
      ) : (
        <Icons.bot className="text-card" width={20} height={20} />
      )}
    </div>
  );
};

export default Chat;
