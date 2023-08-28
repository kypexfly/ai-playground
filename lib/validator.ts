import { z } from "zod";

export const InputValidator = z.object({
  input: z.string().min(1).max(120),
});

export type InputRequest = z.infer<typeof InputValidator>;
