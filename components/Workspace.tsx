"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { requestRoast } from "@/lib/api";
import { TopBar } from "@/components/TopBar";
import { RoastControls } from "@/components/RoastControls";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { CodeEditor } from "@/components/CodeEditor";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim().length === 0) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setRoastResult(null);
    setApiError("");

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: any) {
      setApiError(err?.message || "An unexpected error occurred.");
      setReportState("error");
    }
  }, [code, language, roastLevel, errorMessage, isRoasting]);

  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  }, []);

  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
  }, []);

  // Global Ctrl+Enter / Cmd+Enter shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  // Error line only highlights if the code still matches what was roasted
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  return (
    <main className="w-full max-w-[1360px] mx-auto my-2 sm:my-4 md:my-6 bg-[#FDFDFD] border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] flex flex-col overflow-hidden min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)]">
      {/* Top Bar with Roast Controls */}
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
        />
      </TopBar>

      {/* Conditionally rendered Error Message Drawer */}
      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Responsive Two-Column Workstation Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: ~55% Code Editor */}
        <div className="w-full md:w-[55%] flex flex-col">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
            onLoadSample={handleLoadSample}
          />
        </div>

        {/* Right Column: ~45% Roast Report */}
        <div className="w-full md:w-[45%] flex flex-col">
          <RoastReport
            state={reportState}
            roastLevel={roastLevel}
            language={language}
            result={roastResult}
            errorMsg={apiError}
            onRetry={handleRoast}
            onApplyFix={handleApplyFix}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
