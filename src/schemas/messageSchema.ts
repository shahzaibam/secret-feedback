import { z } from "zod";

export const messageSchema = z.object({
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(300, "Message must be less than 300 characters long"),
});
