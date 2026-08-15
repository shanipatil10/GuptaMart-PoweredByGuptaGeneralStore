"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import QuantitySelector from "@/components/product/QuantitySelector";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function handleQuantityChange(value) {
    setIsUpdating(true);
    updateQuantity(item.id, value);
  }

  useEffect(() => {
    if (!isUpdating) return;

    const timer = setTimeout(() => {
      setIsUpdating(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [item.quantity, isUpdating]);

  function handleRemove() {
    setIsRemoving(true);

    setTimeout(() => {
      removeFromCart(item.id);
    }, 250);
  }

  const itemTotal = item.price * item.quantity;

  return (
    <article
      className={`grid grid-cols-[80px_1fr_auto] gap-4 border-b border-[#1c6d24]/10 py-5 sm:grid-cols-[96px_1fr_auto] ${
        isRemoving
          ? "translate-x-3 scale-[0.98] opacity-0"
          : "translate-x-0 scale-100 opacity-100"
      } transition-all duration-250 ease-out`}
    >
      {/* Product image */}
      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-[#ebf7ea] sm:h-24 sm:w-24">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product information */}
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#4e6452]">
          {item.category} • {item.unit}
        </p>

        <h2 className="mt-1 truncate text-sm font-semibold text-[#1a1c19] sm:text-base">
          {item.name}
        </h2>

        <p className="mt-1 text-sm font-medium text-[#1c6d24]">
          ₹{item.price}
        </p>

        <div className="mt-3">
          <QuantitySelector
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </div>
      </div>

      {/* Price + remove */}
      <div className="flex min-w-[70px] flex-col items-end justify-between">
        <p
          className={`text-sm font-semibold text-[#1a1c19] transition-all duration-200 sm:text-base ${
            isUpdating
              ? "scale-105 text-[#1c6d24]"
              : "scale-100"
          }`}
        >
          ₹{itemTotal}
        </p>

        <button
          type="button"
          onClick={handleRemove}
          disabled={isRemoving}
          aria-label={`Remove ${item.name} from cart`}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-[#707a6c] transition-all duration-200 hover:bg-[#ebf7ea] hover:text-[#1c6d24] active:scale-95 disabled:pointer-events-none"
        >
          <Trash2
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />

          <span className="hidden sm:inline">
            Remove
          </span>
        </button>
      </div>
    </article>
  );
}