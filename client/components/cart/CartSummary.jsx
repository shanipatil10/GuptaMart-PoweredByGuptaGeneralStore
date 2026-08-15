"use client";

import Link from "next/link";
import { ArrowRight, Banknote, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { subtotal } = useCart();

  return (
    <aside className="rounded-3xl border border-[#1c6d24]/10 bg-white p-5 shadow-[0_8px_30px_rgba(45,66,50,0.06)] sm:p-6 lg:sticky lg:top-24">
      {/* Heading */}
      <div className="flex items-center gap-2">
        <ShoppingBag
          className="h-5 w-5 text-[#1c6d24]"
          aria-hidden="true"
        />

        <h2 className="text-lg font-semibold tracking-tight text-[#1a1c19]">
          Order Summary
        </h2>
      </div>

      {/* Price details */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm text-[#707a6c]">
          <span>Subtotal</span>

          <span className="font-medium text-[#1a1c19]">
            ₹{subtotal}
          </span>
        </div>

        <div className="border-t border-[#1c6d24]/10 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-[#1a1c19]">
              Total
            </span>

            <span className="text-xl font-semibold text-[#1c6d24]">
              ₹{subtotal}
            </span>
          </div>
        </div>
      </div>

      {/* Cash payment */}
      <div className="mt-6 rounded-2xl bg-[#ebf7ea] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1c6d24]">
            <Banknote
              className="h-4 w-4"
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#1a1c19]">
              Cash Payment
            </p>

            <p className="mt-1 text-xs leading-5 text-[#707a6c]">
              Payment is currently available by cash.
            </p>
          </div>
        </div>
      </div>

      {/* Proceed to checkout */}
      <button
        type="button"
        onClick={() => {
          console.log("Checkout clicked");
        }}
        className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1c6d24] text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#155a1d] hover:shadow-md active:translate-y-0 active:scale-[0.98]"
      >
        Proceed to Checkout

        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>

      {/* Continue shopping */}
      <Link
        href="/categories"
        className="mt-4 flex h-11 w-full items-center justify-center rounded-full border border-[#1c6d24]/20 text-sm font-semibold text-[#1c6d24] transition-all duration-200 hover:bg-[#ebf7ea] active:scale-[0.98]"
      >
        Continue Shopping
      </Link>
    </aside>
  );
}