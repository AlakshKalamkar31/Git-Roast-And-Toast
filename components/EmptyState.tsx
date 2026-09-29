import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none min-h-[360px]">
      <div className="w-16 h-16 border-2 border-dashed border-[#111111]/30 flex items-center justify-center font-mono text-2xl text-[#111111]/40 mb-4 bg-[#F5F5F3]">
        {"{}"}
      </div>
      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs text-[#737373] max-w-xs leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
