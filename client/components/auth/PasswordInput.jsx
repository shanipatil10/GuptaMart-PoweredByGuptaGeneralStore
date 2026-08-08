"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * PasswordInput
 * Reusable password field with a lock icon and a show/hide toggle.
 * Used for both the Password and Confirm Password fields.
 *
 * Props:
 * - id, label: field identity and visible label
 * - value, onChange: controlled input state
 * - autoComplete: "current-password" for login, "new-password" for signup
 * - labelAction: optional node rendered to the right of the label
 *   (used for the "Forgot?" link so this component stays generic)
 */
export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  autoComplete = "current-password",
  labelAction = null,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
        {labelAction}
      </div>

      <div className="relative">
        <Lock
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <Input
          id={id}
          name={id}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          autoComplete={autoComplete}
          required
          className="h-11 w-full rounded-xl border-neutral-200 bg-neutral-50 pl-10 pr-10 text-sm text-neutral-800 placeholder:text-neutral-400 transition-colors duration-200 focus-visible:border-green-600/40 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-green-600/30"
        />
        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors duration-200 hover:text-neutral-600"
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}