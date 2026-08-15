import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

/**
 * CheckoutSuccess
 * Shown after a successful (currently frontend-only) order submission.
 * order.id is a temporary local value generated in
 * lib/checkout/createOrder.js — it gets replaced by a real
 * backend-generated order ID once Express/MySQL is connected.
 */
export default function CheckoutSuccess({ order }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ebf7ea] text-[#1c6d24] shadow-[0_8px_30px_rgba(45,66,50,0.06)]">
        <CheckCircle2 className="h-10 w-10" strokeWidth={1.7} aria-hidden="true" />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
        GuptaMart
      </p>

      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1a1c19] sm:text-3xl">
        Order Placed
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#707a6c]">
        Thank you! Your order has been received. Our team will reach out to
        confirm delivery details.
      </p>

      <div className="mt-6 w-full max-w-xs rounded-2xl border border-[#1c6d24]/10 bg-white px-6 py-4 shadow-[0_8px_30px_rgba(45,66,50,0.05)]">
        <p className="text-xs text-[#707a6c]">Order Reference</p>
        <p className="mt-1 text-base font-semibold text-[#1a1c19]">{order.id}</p>
        <div className="mt-3 border-t border-[#1c6d24]/10 pt-3">
          <p className="text-xs text-[#707a6c]">Total</p>
          <p className="mt-1 text-lg font-semibold text-[#1c6d24]">₹{order.total}</p>
        </div>
      </div>

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