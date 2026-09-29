import React from "react";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { SectionHeader } from "@/components/SectionHeader";
import { IssueCard } from "@/components/IssueCard";
import { FixedCode } from "@/components/FixedCode";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const issueCount = result?.issues?.length ?? 0;
  const issueLabel =
    issueCount === 1 ? "1 ISSUE DETECTED" : `${issueCount} ISSUES DETECTED`;

  const takeawaySectionNumber =
    result?.correctedCode && result.correctedCode.trim().length > 0 ? 4 : 3;

  return (
    <div className="flex-1 flex flex-col bg-[#FDFDFD] border-t md:border-t-0 md:border-l border-[#111111] overflow-hidden min-h-[480px]">
      {/* 40px Header Strip */}
      <div className="h-10 min-h-10 px-4 bg-[#F5F5F3] border-b border-[#111111] flex items-center justify-between font-mono text-xs select-none">
        <span className="text-[#737373] uppercase tracking-wider text-[11px]">
          AUDIT // REPORT
        </span>
        <span className="font-bold text-[#111111] tracking-wide">
          Roast Report
        </span>
        <span className="w-12 text-right"></span>
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}
        {state === "results" && result && (
          <div className="p-4 md:p-6 space-y-6">
            {/* Section 01 // ROAST */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-[10px] font-bold text-[#D94826] bg-[#FBECE8] border border-[#D94826] px-1.5 py-0.5 tracking-wider uppercase">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="p-4 bg-[#F5F5F3] border-l-4 border-l-[#D94826] border-y border-r border-[#E6E6E2] shadow-[2px_2px_0px_0px_#E6E6E2]">
                <p className="font-mono text-xs md:text-sm text-[#111111] leading-relaxed italic">
                  &ldquo;{result.roast}&rdquo;
                </p>
              </div>
            </div>

            {/* Section 02 // WHAT'S WRONG */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-[10px] font-bold text-[#737373] tracking-wider uppercase">
                  {issueLabel}
                </span>
              </SectionHeader>
              {issueCount === 0 ? (
                <div className="p-4 bg-[#DCFCE7] border border-[#16A34A] text-[#16A34A] font-mono text-xs font-bold text-center">
                  ✓ No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 03 // FIX (conditional) */}
            {result.correctedCode &&
              result.correctedCode.trim().length > 0 && (
                <FixedCode
                  sectionNumber={3}
                  language={language}
                  code={result.correctedCode}
                  onApply={onApplyFix}
                />
              )}

            {/* Takeaway Section (conditional, dynamic number) */}
            {result.takeaway && result.takeaway.trim().length > 0 && (
              <div>
                <SectionHeader
                  number={takeawaySectionNumber}
                  title="Takeaway"
                />
                <div className="p-3 bg-[#FDFDFD] border border-[#111111] shadow-[2px_2px_0px_0px_#E6E6E2]">
                  <p className="font-mono text-xs text-[#111111] leading-relaxed">
                    {result.takeaway}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
