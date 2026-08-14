"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, isHydrated } = useCart();

  // Prevent the server/client mismatch while localStorage is loading.
  if (!isHydrated) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#fafaf4]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-16">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-[#ebf7ea]" />

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="space-y-4">
                <div className="h-32 animate-pulse rounded-3xl bg-white" />
                <div className="h-32 animate-pulse rounded-3xl bg-white" />
              </div>

              <div className="h-80 animate-pulse rounded-3xl bg-white" />
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#fafaf4]">
          <EmptyCart />
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafaf4]">
        <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-16">
          {/* Header */}
          <section className="mb-8">
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#707a6c] transition-colors duration-200 hover:text-[#1c6d24]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Continue Shopping
            </Link>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebf7ea] text-[#1c6d24]">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
                  GuptaMart
                </p>

                <h1 className="text-[30px] font-semibold leading-9 tracking-[-0.02em] text-[#1a1c19] sm:text-[38px] sm:leading-[46px]">
                  Your Cart
                </h1>
              </div>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#707a6c]">
              Review your selected groceries before continuing to checkout.
            </p>
          </section>

          {/* Cart content */}
          <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <div className="rounded-3xl border border-[#1c6d24]/10 bg-white px-5 shadow-[0_8px_30px_rgba(45,66,50,0.05)] sm:px-7">
              <div className="border-b border-[#1c6d24]/10 py-5">
                <h2 className="text-base font-semibold text-[#1a1c19]">
                  Cart Items
                </h2>

                <p className="mt-1 text-xs text-[#707a6c]">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "product" : "products"} in your
                  cart
                </p>
              </div>

              <div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Summary */}
            <CartSummary />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}