"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";

/**
 * ProductCard
 * Reusable card for grocery items. The Add button is purely cosmetic
 * for now — it flips to a brief "Added" confirmation and resets, with
 * no cart state. Real cart logic plugs in here later.
 *
 * Expected product shape:
 * { id, name, category, unit, price, image }
 */
export default function ProductCard({ product }) {
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="group rounded-2xl bg-white p-3 shadow-[0_4px_20px_rgba(45,66,50,0.06)] transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(45,66,50,0.1)]">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#ebf7ea]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#4e6452]">
          {product.category} • {product.unit}
        </p>
        <h3 className="text-sm font-semibold text-[#1a1c19] sm:text-base">
          {product.name}
        </h3>

        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-semibold text-[#1a1c19] sm:text-lg">
            ₹{product.price}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`flex h-8 items-center gap-1 rounded-full px-3 text-xs font-semibold transition-colors duration-200 ${
              justAdded
                ? "bg-[#88d982] text-[#0b2012]"
                : "bg-[#1c6d24] text-white hover:bg-[#155a1d]"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}