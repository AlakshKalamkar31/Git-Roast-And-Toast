import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="px-4 py-3 bg-[#FDFDFD] border-b border-[#111111] flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Left: App Title + Version Tag */}
      <div className="flex items-center gap-2.5">
        <h1 className="font-display text-lg md:text-xl font-bold uppercase tracking-[0.12em] text-[#111111]">
          {APP.name}
        </h1>
        <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 border border-[#111111] bg-[#F5F5F3] text-[#111111] tracking-wider">
          {APP.version}
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {children}
      </div>
    </header>
  );
}
