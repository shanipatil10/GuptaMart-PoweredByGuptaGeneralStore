"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyCart from "@/components/cart/EmptyCart";
import DeliveryForm, { validateDeliveryForm } from "@/components/checkout/DeliveryForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutSuccess from "@/components/checkout/CheckoutSuccess";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/checkout/createOrder";

const INITIAL_VALUES = {
  name: "",
  mobile: "",
  address: "",
  landmark: "",
  pincode: "",
  notes: "",
};

export default function CheckoutPage() {
  const { cartItems, subtotal, isHydrated, clearCart } = useCart();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handlePlaceOrder() {
    if (isSubmitting) return;

    const validationErrors = validateDeliveryForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createOrder({
        customer: values,
        items: cartItems,
        total: subtotal,
      });

      // Empty the cart via the context's existing removeFromCart —
      // CartContext.jsx itself wasn't part of this task's inputs, so
      // rather than guess at adding a new clearCart() method to a file
      // I haven't inspected, this reuses what's already exposed.
      clearCart();

      setOrder(result);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#fafaf4]">
          <CheckoutSuccess order={order} />
        </main>
        <Footer />
      </>
    );
  }

  // Same hydration guard the Cart page uses, for the same reason: the
  // cart is only known after localStorage loads on the client.
  if (!isHydrated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#fafaf4]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-16">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-[#ebf7ea]" />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="h-96 animate-pulse rounded-3xl bg-white" />
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
          <section className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#707a6c] transition-colors duration-200 hover:text-[#1c6d24]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to Cart
            </Link>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
              Secured Checkout
            </p>
            <h1 className="mt-1 text-[28px] font-semibold leading-9 tracking-[-0.01em] text-[#1a1c19] sm:text-[32px] sm:leading-10">
              Delivery Information
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#707a6c]">
              Please provide your details below so your fresh groceries
              reach you at the right place.
            </p>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <DeliveryForm values={values} errors={errors} onChange={handleChange} />
            <OrderSummary onPlaceOrder={handlePlaceOrder} isSubmitting={isSubmitting} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}