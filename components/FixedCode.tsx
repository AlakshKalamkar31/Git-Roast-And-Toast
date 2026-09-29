"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langObj = LANGUAGES.find((l) => l.id === language);
  const extension = langObj?.extension ?? "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mt-6">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-[10px] font-bold text-[#16A34A] tracking-wider uppercase">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-[#111111] bg-[#FDFDFD] shadow-[2px_2px_0px_0px_#E6E6E2] mb-3">
        {/* Solution Header Strip */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#F5F5F3] border-b border-[#111111] font-mono text-xs">
          <span className="font-bold text-[#111111] flex items-center gap-1.5">
            <span>📄</span> solution.{extension}
          </span>
          <span className="font-bold text-[10px] text-[#16A34A] uppercase tracking-wider">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-3 overflow-x-auto max-h-[380px] bg-[#FFFFFF]">
          <pre className="m-0 font-mono text-xs leading-relaxed text-[#111111]">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 min-w-[140px] px-3 py-2 bg-[#FDFDFD] hover:bg-[#111111] hover:text-white border border-[#111111] font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-[2px_2px_0px_0px_#111111] cursor-pointer text-center"
        >
          {copyLabel}
        </button>
        <button
          type="button"
          onClick={() => onApply(code)}
          className="flex-1 min-w-[140px] px-3 py-2 bg-[#111111] text-white hover:bg-[#D94826] border border-[#111111] font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-[2px_2px_0px_0px_#111111] cursor-pointer text-center"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
