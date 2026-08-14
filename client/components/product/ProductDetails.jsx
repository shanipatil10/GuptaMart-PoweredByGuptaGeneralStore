"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, Heart, Wallet, ShieldCheck } from "lucide-react";
import QuantitySelector from "@/components/product/QuantitySelector";

/**
 * ProductDetails
 * Left: product image (thumbnails only render if the product ever gets
 * more than one real photo — we don't fabricate extra angles).
 * Right: breadcrumb, name, price, description, highlights, quantity,
 * Add to Cart, and a save/wishlist toggle.
 *
 * Add to Cart and the save toggle are both local-only visual feedback,
 * same pattern as ProductCard's Add button — no cart context or
 * persistence yet.
 */
export default function ProductDetails({ product }) {
  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  function handleAddToCart() {
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#ebf7ea]">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1c6d24] shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {gallery.length > 1 && (
          <div className="mt-3 flex gap-3">
            {gallery.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(src)}
                aria-label={`Show ${product.name} image`}
                aria-current={activeImage === src}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#ebf7ea] transition-all duration-200 ${
                  activeImage === src
                    ? "ring-2 ring-[#1c6d24]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <nav
          aria-label="Breadcrumb"
          className="mb-3 flex items-center gap-1.5 text-xs text-[#707a6c]"
        >
          <Link href="/categories" className="hover:text-[#1c6d24]">
            Categories
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={product.categoryHref} className="hover:text-[#1c6d24]">
            {product.category}
          </Link>
        </nav>

        <h1 className="text-[28px] font-semibold leading-9 tracking-[-0.01em] text-[#1a1c19] sm:text-[32px] sm:leading-10">
          {product.name}
        </h1>

        <p className="mt-3 flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold text-[#1c6d24] sm:text-[28px]">
            ₹{product.price}
          </span>
          <span className="text-sm font-medium text-[#707a6c]">
            / {product.unit}
          </span>
        </p>

        <p className="mt-5 max-w-lg text-base leading-6 text-[#40493d]">
          {product.description}
        </p>

        {product.highlights?.length > 0 && (
          <ul className="mt-4 space-y-2">
            {product.highlights.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-[#40493d]"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#1c6d24]"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center gap-4">
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <span className="text-sm text-[#707a6c]">{product.unit} per unit</span>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              justAdded
                ? "bg-[#88d982] text-[#0b2012]"
                : "bg-[#1c6d24] text-white hover:bg-[#155a1d]"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                Add to Cart
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsSaved((v) => !v)}
            aria-pressed={isSaved}
            aria-label={isSaved ? "Remove from saved items" : "Save for later"}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
              isSaved
                ? "border-[#1c6d24] bg-[#ebf7ea] text-[#1c6d24]"
                : "border-[#1c6d24]/20 text-[#1a1c19] hover:bg-[#ebf7ea]"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 rounded-2xl bg-[#ebf7ea] px-4 py-3">
            <Wallet className="h-4 w-4 shrink-0 text-[#1c6d24]" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-[#1a1c19]">
                Cash on Delivery
              </p>
              <p className="text-[11px] text-[#707a6c]">Pay when it arrives</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl bg-[#ebf7ea] px-4 py-3">
            <ShieldCheck
              className="h-4 w-4 shrink-0 text-[#1c6d24]"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold text-[#1a1c19]">
                Quality Checked
              </p>
              <p className="text-[11px] text-[#707a6c]">Carefully selected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}