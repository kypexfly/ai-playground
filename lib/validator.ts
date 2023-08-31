import { z } from "zod";

export const InputValidator = z.object({
  input: z.string().min(1).max(120),
});

export type InputRequest = z.infer<typeof InputValidator>;

export const InputChatbotValidator = z.object({
  messages: z.any(),
  apiKey: z.string().min(1, { message: "API Key is required" }),
});

export type InputChatbotRequest = z.infer<typeof InputChatbotValidator>;
