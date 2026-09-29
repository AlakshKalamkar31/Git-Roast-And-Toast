import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t border-[#111111] bg-[#F5F5F3] font-mono text-[11px] text-[#737373] select-none py-2 px-4 flex flex-col gap-1.5">
      {/* Primary Status Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1">
        <div className="flex items-center gap-1.5">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="text-[#D97706] font-bold animate-pulse">
              ● PROCESSING...
            </span>
          ) : (
            <span className="text-[#16A34A] font-bold">
              ● ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-[#E6E6E2]">|</span>
          <span className="hidden sm:inline">ENGINE: GOOGLE GEMINI</span>
        </div>

        <div className="uppercase tracking-[0.15em] font-bold text-[#111111] text-[10px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Understated Workshop Credit Row */}
      <div className="text-center text-[10px] text-[#737373]/70 border-t border-[#E6E6E2]/60 pt-1">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
