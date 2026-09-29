"use client";

import React, { useRef, useState, useEffect } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);

  const langObj = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langObj?.label ?? language.toUpperCase();

  const updateCursor = (target: HTMLTextAreaElement) => {
    const textBefore = target.value.substring(0, target.selectionStart);
    const splitLines = textBefore.split("\n");
    const currentLine = splitLines.length;
    const currentCol = splitLines[splitLines.length - 1].length + 1;
    setCursor({ line: currentLine, col: currentCol });
  };

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);
      setTimeout(() => updateCursor(textarea), 0);
    }
  };

  const handleClear = () => {
    onChange("");
    setCursor({ line: 1, col: 1 });
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FDFDFD] overflow-hidden min-h-[480px]">
      {/* 40px Header Strip */}
      <div className="h-10 min-h-10 px-4 bg-[#F5F5F3] border-b border-[#111111] flex items-center justify-between font-mono text-xs select-none">
        <span className="text-[#737373] uppercase tracking-wider text-[11px]">
          INPUT // SRC
        </span>
        <span className="font-bold text-[#111111] tracking-wide">
          Your Code
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[11px] font-bold text-[#111111] hover:text-[#D94826] underline uppercase tracking-wider transition-colors cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-[#E6E6E2]">|</span>
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] font-bold text-[#737373] hover:text-[#111111] underline uppercase tracking-wider transition-colors cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex-1 flex overflow-hidden relative font-mono text-xs">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="w-12 py-3 bg-[#F5F5F3] border-r border-[#E6E6E2] select-none overflow-hidden text-right pr-2 leading-[22px]"
          aria-hidden="true"
        >
          {Array.from({ length: lineCount }, (_, i) => i + 1).map((lineNum) => {
            const isError = lineNum === errorLine;
            return (
              <div
                key={lineNum}
                className={`h-[22px] ${
                  isError
                    ? "bg-[#FBECE8] text-[#D94826] font-bold border-r-2 border-r-[#D94826] -mr-2 pr-2"
                    : "text-[#737373]/60"
                }`}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => {
            onChange(e.target.value);
            updateCursor(e.target);
          }}
          onScroll={handleScroll}
          onSelect={(e) => updateCursor(e.currentTarget)}
          onClick={(e) => updateCursor(e.currentTarget)}
          onKeyUp={(e) => updateCursor(e.currentTarget)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="// Paste your code here..."
          className="flex-1 p-3 leading-[22px] bg-transparent text-[#111111] font-mono text-xs resize-none outline-none overflow-auto whitespace-pre font-normal focus:ring-0 placeholder:text-[#737373]/40"
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 min-h-7 px-3 bg-[#F5F5F3] border-t border-[#E6E6E2] flex items-center justify-between font-mono text-[11px] text-[#737373] select-none">
        <div>
          Ln {cursor.line}, Col {cursor.col} ·{" "}
          <span className="text-[#111111] font-bold">{languageLabel}</span>
        </div>
        <div className="hidden sm:block">UTF-8 · Tab Size: 4</div>
      </div>
    </div>
  );
}
