import Link from "next/link";
import { Leaf, Home, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Page Not Found | GuptaMart",
  description: "The page you're looking for could not be found.",
};

/**
 * NotFound
 * Next.js App Router's reserved not-found.js — this catches both:
 *  1. Any unmatched URL (e.g. /random-invalid-route), automatically.
 *  2. Any notFound() call from a route segment, e.g. an invalid id in
 *     /product/[id]/page.js — no changes needed there, it already
 *     calls notFound() and will now render this instead of the
 *     default Next.js error screen.
 *
 * The root layout doesn't render Navbar/Footer globally — every page
 * (Home, Categories, Product, etc.) renders its own — so this page
 * does the same rather than appearing bare and unbranded.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fafaf4] px-5 py-20 text-center">
        <div className="animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ebf7ea] text-[#1c6d24] shadow-sm">
            <Leaf className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" />
          </span>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
            404
          </p>

          <h1 className="mt-2 text-[32px] font-semibold leading-10 tracking-[-0.01em] text-[#1a1c19] sm:text-[40px] sm:leading-[48px]">
            Page Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#40493d] sm:text-base">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            may have been moved, renamed, or doesn&apos;t exist.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1c6d24] px-6 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-[#155a1d] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24]/50 focus-visible:ring-offset-2"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>

            <Link
              href="/categories"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#1c6d24]/20 px-6 text-sm font-semibold text-[#1a1c19] transition-all duration-200 ease-out hover:bg-[#ebf7ea] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24]/50 focus-visible:ring-offset-2"
            >
              Shop Groceries
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}