import Image from "next/image";
import { Leaf, ShieldCheck, MapPin } from "lucide-react";

const SUPPORTING_POINTS = [
  { icon: Leaf, label: "Fresh Everyday Essentials" },
  { icon: ShieldCheck, label: "Quality Products" },
  { icon: MapPin, label: "Local Store, Personal Service" },
];

/**
 * AboutSection
 * Compact About panel. Copy is intentionally plain and factual — no
 * founding year, customer counts, or awards, since none of that has
 * been confirmed by the store.
 */
export default function AboutSection() {
  return (
    <section className="bg-[#fafaf4] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-16">
        <div className="grid items-center gap-8 rounded-3xl bg-[#ebf7ea] p-6 sm:p-10 md:grid-cols-2 md:gap-12 md:p-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/about/store.jpg"
              alt="Inside Gupta General Store"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#1c6d24]">
              About Us
            </span>
            <h2 className="mt-2 text-[28px] font-semibold leading-[36px] tracking-tight text-[#1a1c19] md:text-[32px] md:leading-[40px]">
              Rooted in Freshness, Focused on You.
            </h2>
            <p className="mt-4 text-base leading-[24px] text-[#40493d]">
              Gupta General Store is a local grocery store focused on
              providing quality everyday essentials, fresh produce and
              reliable service to the community.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#1c6d24]/10 pt-6 sm:grid-cols-3">
              {SUPPORTING_POINTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-2.5 sm:flex-col sm:items-start sm:gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1c6d24]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="pt-1.5 text-sm font-medium text-[#1a1c19] sm:pt-0">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}