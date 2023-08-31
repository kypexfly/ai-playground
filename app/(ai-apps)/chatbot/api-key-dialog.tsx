"use client";

import { Dialog, DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useRef } from "react";

interface ApiKeyDialog {
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
}

const ApiKeyDialog = ({ apiKey, setApiKey }: ApiKeyDialog) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setApiKey(inputRef.current?.value ?? "");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="default" aria-label="API Keys">
          <Icons.key className="mr-2 h-4 w-4" />
          Set OpenAI Key
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>

          <DialogDescription>
            Setup your API Key to start using the chatbot.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="openai" className="text-right">
              OpenAI
            </Label>

            <Input
              ref={inputRef}
              defaultValue={apiKey}
              id="openai"
              placeholder="your API key"
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
