// src/lib/env.ts
import { z } from "zod";

/**
 * We define what environment variables we expect.
 * If something is missing, we throw a helpful error.
 */
const EnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is missing"),
});

export const env = EnvSchema.parse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});
