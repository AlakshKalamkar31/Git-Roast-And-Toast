import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status?: number, error?: unknown): string {
  const rawMsg =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "";

  switch (status) {
    case 400:
      return `Invalid request structure (400). Please check your code input and configuration. Details: ${rawMsg}`;
    case 403:
      return `Authentication or permission failed (403). Ensure your GEMINI_API_KEY in .env.local is valid and has access to Gemini API.`;
    case 404:
      return `Model not found (404). Check AI.model ("${AI.model}") in config/app.config.ts.`;
    case 429:
      return `Gemini API rate limit exceeded (429). Please wait a few moments before roasting another snippet.`;
    case 503:
      return `Gemini service is temporarily overloaded (503). All retry attempts failed. Please try again shortly.`;
    default:
      return rawMsg || "An unexpected error occurred while communicating with Gemini API.";
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  let lastError: unknown = null;
  let lastStatus: number | undefined = undefined;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim().length === 0) {
        throw new Error("Received an empty response from Gemini API.");
      }

      let parsed: any;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(
          `Failed to parse Gemini response as JSON: ${
            jsonErr instanceof Error ? jsonErr.message : "Malformed JSON"
          }`
        );
      }

      return {
        roast: typeof parsed.roast === "string" ? parsed.roast : "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode:
          typeof parsed.correctedCode === "string" ? parsed.correctedCode : "",
        takeaway: typeof parsed.takeaway === "string" ? parsed.takeaway : "",
      };
    } catch (err: any) {
      lastError = err;
      const status =
        err?.status ??
        err?.statusCode ??
        err?.response?.status ??
        (err?.message?.includes("503") ? 503 : undefined);
      lastStatus = status;

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(friendlyErrorMessage(lastStatus, lastError));
    }
  }

  throw new Error(friendlyErrorMessage(lastStatus, lastError));
}
