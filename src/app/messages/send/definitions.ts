import { z } from "zod";

export const SendMessageFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .trim(),
  msg: z.string().min(1, { message: "A message is required" }).trim(),
  priority: z.string().regex(/^[1-3]/, { message: "only 1-3 are valid" }),
});

export type SendMessageFormSchema = z.infer<typeof SendMessageFormSchema>;

export type FormState =
  | {
      errors?: {
        name?: string[];
        msg?: string[];
        priority?: string[];
      };
      message?: string;
    }
  | undefined;
