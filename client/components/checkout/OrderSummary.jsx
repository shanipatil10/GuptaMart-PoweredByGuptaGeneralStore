"use client";

import Image from "next/image";
import { ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

/**
 * OrderSummary
 * Reads cartItems/subtotal straight from CartContext — the same source
 * CartSummary.jsx reads on the Cart page — so nothing is recalculated
 * or can drift between the two. The only real difference from
 * CartSummary is the action: "Place Order" triggers form validation
 * and submission (with a loading state) instead of navigating away.
 *
 * No delivery fee row: the project has no delivery-fee data anywhere,
 * so showing one (even "Free") would be inventing a business rule.
 */
export default function OrderSummary({ onPlaceOrder, isSubmitting }) {
  const { cartItems, subtotal } = useCart();

  return (
    <aside className="animate-in fade-in slide-in-from-bottom-4 rounded-3xl border border-[#1c6d24]/10 bg-white p-5 shadow-[0_8px_30px_rgba(45,66,50,0.06)] duration-500 [animation-delay:100ms] sm:p-6 lg:sticky lg:top-24">
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-[#1c6d24]" aria-hidden="true" />
        <h2 className="text-lg font-semibold tracking-tight text-[#1a1c19]">
          Order Summary
        </h2>
      </div>

      <ul className="mt-5 space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#ebf7ea]">
              <Image src={item.image} alt={item.name} fill sizes="44px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#1a1c19]">{item.name}</p>
              <p className="text-xs text-[#707a6c]">
                {item.unit} × {item.quantity}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-[#1a1c19]">
              ₹{item.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-3 border-t border-[#1c6d24]/10 pt-4">
        <div className="flex items-center justify-between text-sm text-[#707a6c]">
          <span>Subtotal</span>
          <span className="font-medium text-[#1a1c19] transition-all duration-200">
            ₹{subtotal}
          </span>
        </div>

        <div className="border-t border-[#1c6d24]/10 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-[#1a1c19]">Total</span>
            <span className="text-xl font-semibold text-[#1c6d24] transition-all duration-200">
              ₹{subtotal}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1c6d24] text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#155a1d] hover:shadow-md active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 motion-reduce:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Placing Order...
          </>
        ) : (
          <>
            Place Order • ₹{subtotal}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </aside>
  );
}