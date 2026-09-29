import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-[#D94826] bg-[#FBECE8] flex items-center justify-center font-mono text-3xl font-bold text-[#D94826] mb-4 shadow-[2px_2px_0px_0px_#D94826]">
        !
      </div>
      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#D94826] mb-2">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs text-[#737373] max-w-sm leading-relaxed mb-6 break-words">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 bg-[#FDFDFD] hover:bg-[#111111] hover:text-white border border-[#111111] font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-[2px_2px_0px_0px_#111111] cursor-pointer"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
