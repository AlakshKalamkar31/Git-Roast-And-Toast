import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log(`[CHECK-API] Initiating test roast with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n==================== TEST ROAST SUCCESS ====================");
    console.log(`Roast: ${result.roast}`);
    console.log(`Issues detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  [#${idx + 1}] (${issue.severity}) Line ${issue.line}: ${issue.title}`);
    });
    console.log(`Corrected Code preview:\n${result.correctedCode.slice(0, 120)}...`);
    console.log(`Takeaway: ${result.takeaway}`);
    console.log("============================================================\n");
    process.exit(0);
  } catch (error) {
    console.error("\n==================== TEST ROAST FAILED ====================");
    console.error(error instanceof Error ? error.message : error);
    console.error("===========================================================\n");
    process.exit(1);
  }
}

main();
