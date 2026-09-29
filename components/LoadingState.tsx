import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none min-h-[360px]">
      <div className="w-16 h-16 border-2 border-[#111111] flex items-center justify-center font-mono text-2xl text-[#111111] mb-4 bg-[#FDFDFD] shadow-[2px_2px_0px_0px_#111111]">
        <span className="inline-block animate-spin text-[#D94826]">/</span>
      </div>
      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-[#737373] max-w-xs leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
