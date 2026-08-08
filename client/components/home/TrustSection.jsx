import { Leaf, ShoppingBag, Wallet } from "lucide-react";

const BENEFITS = [
  {
    icon: Leaf,
    title: "Fresh & Quality",
    description: "Carefully selected products for everyday needs.",
  },
  {
    icon: ShoppingBag,
    title: "Easy Ordering",
    description: "Browse products and place your grocery order online.",
  },
  {
    icon: Wallet,
    title: "Cash on Delivery",
    description: "Pay when your order arrives.",
  },
];

/**
 * TrustSection
 * Simple three-column reassurance section. Kept to claims the store can
 * actually stand behind — no delivery-time promises.
 */
export default function TrustSection() {
  return (
    <section className="bg-[#fafaf4] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:gap-8">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center sm:text-left">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ebf7ea] text-[#1c6d24] sm:mx-0">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-[#1a1c19]">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-[20px] text-[#40493d]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}