"use client";

import { predictInput } from "@/lib/api";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const Playground = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const prediction = await predictInput(input);
      setResponse(prediction);
      setInput("");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-2 py-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-3 rounded bg-card p-4 sm:p-16"
      >
        <h1 className="text-2xl">Ask to ChatGPT</h1>

        <Textarea
          value={input}
          className="min-h-[150px]"
          placeholder="Type something here..."
          autoFocus={true}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button isLoading={isLoading} type="submit">
          Ask
        </Button>

        {response && (
          <>
            <h1 className="text-2xl">Reponse</h1>
            <p>{response}</p>
          </>
        )}
      </form>
    </div>
  );
};

export default Playground;
