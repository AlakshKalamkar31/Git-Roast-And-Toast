import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel, RoastRequest } from "@/types/roast";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  // Validation in exact specified order
  if (!code || code.trim().length === 0) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code length exceeds limit of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message length exceeds limit of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Fallbacks for language and roastLevel
  const validLanguages = LANGUAGES.map((l) => l.id) as readonly string[];
  const validRoastLevels = ROAST_LEVELS.map((r) => r.id) as readonly string[];

  const language: LanguageId = validLanguages.includes(body.language)
    ? body.language
    : DEFAULTS.language;

  const roastLevel: RoastLevel = validRoastLevels.includes(body.roastLevel)
    ? body.roastLevel
    : DEFAULTS.roastLevel;

  const roastRequest: RoastRequest = {
    code,
    language,
    roastLevel,
    ...(errorMessage ? { errorMessage } : {}),
  };

  try {
    const result = await analyzeCode(roastRequest);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error during analysis.";
    console.error("[ROAST_API_ERROR]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
