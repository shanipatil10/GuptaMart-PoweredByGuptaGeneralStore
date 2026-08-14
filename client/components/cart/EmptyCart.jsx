"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center px-5 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ebf7ea] text-[#1c6d24] shadow-[0_8px_30px_rgba(45,66,50,0.06)]">
        <ShoppingCart className="h-9 w-9" strokeWidth={1.7} aria-hidden="true" />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
        GuptaMart
      </p>

      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1a1c19] sm:text-3xl">
        Your cart is empty
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#707a6c]">
        Looks like you have not added anything yet. Explore our groceries and
        add the essentials you need.
      </p>

      <Link
        href="/categories"
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#1c6d24] px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#155a1d] active:scale-[0.98]"
      >
        Continue Shopping
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}