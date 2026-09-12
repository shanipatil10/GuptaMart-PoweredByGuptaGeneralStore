"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

/**
 * CartOverview
 * Reuses the existing CartContext directly — no second cart system.
 * cartCount/subtotal reflect the real current cart, including the
 * genuine zero-item state (that's not fake data, it's just accurate).
 */
export default function CartOverview() {
  const { cartCount, subtotal } = useCart();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-3xl bg-[#1c6d24] p-5 text-white shadow-[0_8px_30px_rgba(28,109,36,0.25)] transition-transform duration-200 hover:-translate-y-0.5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4.5 w-4.5" aria-hidden="true" />
          <h2 className="text-sm font-semibold">Your Cart</h2>
        </div>
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold">
          {cartCount} {cartCount === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <span className="text-xs text-white/70">Current Total</span>
        <span className="text-lg font-semibold">₹{subtotal}</span>
      </div>

      <Link
        href="/cart"
        className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-[#1c6d24] transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
      >
        View Cart
      </Link>
    </div>
  );
}