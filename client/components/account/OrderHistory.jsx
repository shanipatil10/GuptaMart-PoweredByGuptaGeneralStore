import Link from "next/link";
import { PackageOpen, ArrowRight } from "lucide-react";

/**
 * OrderHistory
 * No real order-history API/database exists yet, so this always shows
 * the honest empty state for now — no fabricated order list.
 *
 * Ready for later: pass a real `orders` array (shape: { id, createdAt,
 * status, total, items }) once GET /api/orders/my-orders exists, and
 * this component renders it instead — the empty-state branch and the
 * (currently unused) list-rendering branch already both exist below,
 * so wiring in real data won't require touching this file's structure.
 */
export default function OrderHistory({ orders = [] }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:150ms] rounded-3xl border border-[#1c6d24]/10 bg-white p-5 shadow-[0_8px_30px_rgba(45,66,50,0.05)] sm:p-7">
      <h2 className="text-base font-semibold text-[#1a1c19]">Order History</h2>

      {orders.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-[#f4f4ee] px-6 py-12 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#707a6c]">
            <PackageOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-semibold text-[#1a1c19]">No orders yet</p>
          <p className="mt-1 max-w-xs text-xs leading-5 text-[#707a6c]">
            Your completed orders will appear here once you place one.
          </p>
          <Link
            href="/categories"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#1c6d24] px-5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#155a1d] active:scale-[0.98]"
          >
            Start Shopping
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex items-center justify-between rounded-2xl border border-[#1c6d24]/10 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-[#1a1c19]">{order.id}</p>
                <p className="text-xs text-[#707a6c]">
                  {new Date(order.createdAt).toLocaleDateString()} • {order.status}
                </p>
              </div>
              <span className="text-sm font-semibold text-[#1c6d24]">₹{order.total}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}