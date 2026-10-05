"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function GlobalError({ error, reset }) {
  function handleTryAgain() {
    reset();
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fafaf4] px-5 py-20 text-center">
        <div className="w-full max-w-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ebf7ea] text-[#1c6d24] shadow-sm">
            <AlertTriangle
              className="h-7 w-7"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
            Something went wrong
          </p>

          <h1 className="mt-2 text-[32px] font-semibold leading-10 tracking-[-0.01em] text-[#1a1c19] sm:text-[40px] sm:leading-[48px]">
            We hit a little snag
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#40493d] sm:text-base">
            Something unexpected happened while loading this page. Please try
            again or return to GuptaMart.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleTryAgain}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1c6d24] px-6 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-[#155a1d] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24]/50 focus-visible:ring-offset-2"
            >
              <RefreshCw
                className="h-4 w-4"
                aria-hidden="true"
              />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#1c6d24]/20 px-6 text-sm font-semibold text-[#1a1c19] transition-all duration-200 ease-out hover:bg-[#ebf7ea] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24]/50 focus-visible:ring-offset-2"
            >
              <Home
                className="h-4 w-4"
                aria-hidden="true"
              />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}