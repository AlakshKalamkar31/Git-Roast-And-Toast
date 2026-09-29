import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-[#F5F5F3] border-b border-[#111111] p-3 font-mono">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="error-input"
          className="text-[11px] font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5"
        >
          <span className="text-[#D94826]">●</span>
          Attach Terminal Traceback / Compiler Error (Optional)
        </label>
        <button
          type="button"
          onClick={onClose}
          className="text-[11px] font-bold text-[#737373] hover:text-[#111111] uppercase tracking-wider transition-colors cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        id="error-input"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='e.g., TypeError: unsupported operand type(s) for +=: "int" and "list"'
        className="w-full bg-[#FDFDFD] border border-[#111111] p-2 text-xs text-[#111111] font-mono outline-none focus:border-[#D94826] resize-y placeholder:text-[#737373]/50"
      />
    </div>
  );
}
