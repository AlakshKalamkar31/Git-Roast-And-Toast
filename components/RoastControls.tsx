import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2">
        <span className="text-[#737373] uppercase tracking-wider text-[11px] font-bold select-none">
          Roast Level:
        </span>
        <div className="flex items-center gap-2 bg-[#F5F5F3] p-1 border border-[#E6E6E2]">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`flex items-center gap-1.5 px-2 py-1 cursor-pointer select-none border transition-colors ${
                  isSelected
                    ? "bg-[#111111] text-white border-[#111111] font-bold"
                    : "bg-transparent text-[#737373] hover:text-[#111111] border-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                <span
                  className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "border-white bg-[#D94826]"
                      : "border-[#737373] bg-transparent"
                  }`}
                />
                <span className="text-[11px] uppercase tracking-wider">
                  {level.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Dropdown */}
      <div className="flex items-center gap-1.5">
        <span className="text-[#737373] uppercase tracking-wider text-[11px] font-bold select-none">
          Language:
        </span>
        <div className="relative inline-block">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-[#FDFDFD] border border-[#111111] px-3 py-1.5 pr-7 text-xs font-mono font-bold text-[#111111] outline-none focus:border-[#D94826] cursor-pointer shadow-[2px_2px_0px_0px_#E6E6E2]"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#111111]">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`px-2.5 py-1.5 border border-dashed border-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
          errorDrawerOpen
            ? "bg-[#111111] text-white"
            : "bg-[#F5F5F3] hover:bg-[#E6E6E2] text-[#111111]"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Action Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`px-4 py-2 bg-[#111111] text-white hover:bg-[#D94826] border border-[#111111] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_#111111] flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-80 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none`}
      >
        {isRoasting ? (
          <span className="flex items-center gap-2 animate-pulse text-[#D94826]">
            <span>⚡</span> ANALYZING...
          </span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="text-[10px] bg-white/20 px-1 py-0.5 border border-white/30 text-white/90">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
