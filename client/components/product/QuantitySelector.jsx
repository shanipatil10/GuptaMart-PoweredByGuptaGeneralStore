"use client";

import { Minus, Plus } from "lucide-react";

/**
 * QuantitySelector
 * Small controlled stepper: "- value +". The parent owns the quantity
 * state via value/onChange — this component has no state of its own,
 * so it's reusable anywhere a quantity needs picking (cart page later
 * included) without duplicating the increment/decrement logic.
 */
export default function QuantitySelector({ value, onChange, min = 1, max = 20 }) {
  function decrement() {
    onChange(Math.max(min, value - 1));
  }

  function increment() {
    onChange(Math.min(max, value + 1));
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#1c6d24]/20 bg-white p-1">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#1a1c19] transition-colors duration-200 hover:bg-[#ebf7ea] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span
        className="w-6 text-center text-sm font-semibold text-[#1a1c19]"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#1a1c19] transition-colors duration-200 hover:bg-[#ebf7ea] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}