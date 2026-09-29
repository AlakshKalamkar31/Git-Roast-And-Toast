import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  { badgeClass: string; stripeClass: string }
> = {
  "FATAL BUG": {
    badgeClass: "bg-[#FBECE8] text-[#D94826] border-[#D94826]",
    stripeClass: "border-l-4 border-l-[#D94826]",
  },
  "CODE SMELL": {
    badgeClass: "bg-[#FEF3C7] text-[#D97706] border-[#D97706]",
    stripeClass: "border-l-4 border-l-[#D97706]",
  },
  "OPTIMIZATION": {
    badgeClass: "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]",
    stripeClass: "border-l-4 border-l-[#16A34A]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const config =
    severityConfig[issue.severity] || severityConfig["FATAL BUG"];

  return (
    <div className="bg-[#FDFDFD] border border-[#111111] p-3.5 mb-3 shadow-[2px_2px_0px_0px_#E6E6E2]">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="bg-[#111111] text-white font-mono text-[10px] font-bold px-1.5 py-0.5 tracking-wider">
            #{paddedIndex}
          </span>
          <span className="font-mono text-[11px] font-bold text-[#111111] tracking-wide">
            LINE {issue.line}
          </span>
          <span
            className={`font-mono text-[10px] font-bold px-1.5 py-0.5 border uppercase tracking-wider ${config.badgeClass}`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#737373] text-right break-words max-w-[55%]">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div
          className={`bg-[#F5F5F3] border border-[#E6E6E2] p-2.5 mb-2.5 font-mono text-xs overflow-x-auto ${config.stripeClass}`}
        >
          <pre className="m-0 text-[#111111] leading-relaxed whitespace-pre-wrap">
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 font-mono text-xs">
        <div className="flex items-start gap-1.5 text-[#D94826]">
          <span className="font-bold select-none">✕</span>
          <div className="text-[#111111]">
            <strong className="text-[#D94826]">Diagnosis:</strong>{" "}
            {issue.diagnosis}
          </div>
        </div>
        <div className="flex items-start gap-1.5 text-[#16A34A]">
          <span className="font-bold select-none">✓</span>
          <div className="text-[#111111]">
            <strong className="text-[#16A34A]">Expected:</strong>{" "}
            {issue.expected}
          </div>
        </div>
      </div>
    </div>
  );
}
