"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

/**
 * ProductCard
 * Reusable card for grocery items.
 *
 * Expected product shape:
 * { id, name, category, unit, price, image, href? }
 *
 * href:
 * - undefined → use /product/{id}
 * - string → use the provided product details route
 * - null → card is intentionally not clickable
 */
export default function ProductCard({ product }) {
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  function handleAdd() {
    addToCart(product, 1);

    setJustAdded(true);

    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  }

  const productHref =
    product.href !== undefined
      ? product.href
      : `/product/${product.id}`;

  const productContent = (
    <>
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

        <div className="pt-1">
          <span className="text-base font-semibold text-[#1a1c19] sm:text-lg">
            ₹{product.price}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <div className="group rounded-2xl bg-white p-3 shadow-[0_4px_20px_rgba(45,66,50,0.06)] transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(45,66,50,0.1)]">
      {productHref ? (
        <Link
          href={productHref}
          aria-label={`View ${product.name}`}
          className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24] focus-visible:ring-offset-2"
        >
          {productContent}
        </Link>
      ) : (
        productContent
      )}

      <div className="flex items-center justify-end pt-1">
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className={`flex h-8 items-center gap-1 rounded-full px-3 text-xs font-semibold transition-all duration-200 active:scale-95 ${
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
  );
}