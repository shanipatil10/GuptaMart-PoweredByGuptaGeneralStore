import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Hero
 * Landing section for GuptaMart. Two-column on desktop (copy + CTAs on
 * one side, produce photography on the other), stacks naturally on
 * mobile with the copy first for readability.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fafaf4]">
      {/* Ambient decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#ebf7ea] blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-1280px items-center gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-16">
        
        {/* Copy */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-0.05em text-[#1c6d24]">
            Fresh From Gupta General Store
          </span>

          {/* Editorial Hero Heading */}
         <h1
  className="mt-3 text-[52px] font-normal leading-[0.95] tracking-[-0.02em] sm:text-[60px] md:text-[68px] lg:text-[76px]"
  style={{ fontFamily: "var(--font-cormorant)" }}
>
  <span className="block text-[#1a1c19]">
    Freshness
  </span>

  <span className="block italic text-[#1c6d24]">
    Delivered to Your
  </span>

  <span className="block italic text-[#1c6d24]">
    Door.
  </span>
</h1>

          <p className="mt-6 max-w-md text-base leading-28px text-[#40493d] sm:text-lg">
            Quality groceries, fresh produce and everyday essentials from
            Gupta General Store.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/categories"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#1c6d24] px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#155a1d]"
            >
              Shop Groceries
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/categories"
              className="inline-flex h-12 items-center rounded-full border border-[#1c6d24]/20 px-7 text-sm font-semibold text-[#1a1c19] transition-colors duration-200 hover:bg-[#ebf7ea]"
            >
              Explore Categories
            </Link>
          </div>
        </div>

        {/* Visual */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-[#ebf7ea] md:aspect-square">
          <Image
            src="/images/hero/hero.png"
            alt="Fresh vegetables and produce at Gupta General Store"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}