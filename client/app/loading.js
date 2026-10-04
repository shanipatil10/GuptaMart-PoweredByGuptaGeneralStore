import { Leaf } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Loading
 * Next.js App Router's reserved loading.js — rendered as the Suspense
 * fallback while a route segment is loading (server-rendering a page,
 * or a client-side navigation fetching one). No data fetching, no
 * client state, no timers — just static markup and CSS animation.
 *
 * Navbar/Footer are included explicitly, matching every other page in
 * this project. layout.js doesn't render them globally, so without
 * this the loading state would flash with no site chrome at all. Both
 * are safe to render here since loading.js is a child of layout.js's
 * CartProvider/AuthProvider, same as any other page.
 */
export default function Loading() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fafaf4] px-5 py-20 text-center">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <span
            className="absolute inset-0 animate-ping rounded-2xl bg-[#88d982]/50 motion-reduce:hidden"
            aria-hidden="true"
          />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ebf7ea] text-[#1c6d24] shadow-sm">
            <Leaf className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" />
          </span>
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
          GuptaMart
        </p>

        <p role="status" aria-live="polite" className="mt-1 text-base text-[#40493d]">
          Loading...
        </p>
      </main>

      <Footer />
    </>
  );
}