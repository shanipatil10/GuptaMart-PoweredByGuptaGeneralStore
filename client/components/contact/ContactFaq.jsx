import Link from "next/link";
import { ChevronDown } from "lucide-react";

/**
 * Only facts confirmed by the current project appear here:
 *  - cash payment only (no online payments)
 *  - products are found via Categories or the Navbar search
 *  - there is no live stock data and no order tracking/history yet
 *
 * If the backend integration adds order history or stock levels, update
 * the matching answers below.
 */
const FAQS = [
  {
    question: "How can I ask about an order?",
    answer: (
      <p>
        Online order tracking and order history aren&apos;t available on the
        website yet. For a question about an order, please contact Gupta
        General Store directly using the store details on this page, and
        mention what you ordered.
      </p>
    ),
  },
  {
    question: "How do I check whether a product is available?",
    answer: (
      <p>
        Use the search bar at the top of the site or browse{" "}
        <Link
          href="/categories"
          className="font-semibold text-[#1c6d24] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24]/50"
        >
          Categories
        </Link>{" "}
        to find a product. The website doesn&apos;t show live stock levels yet,
        so please contact the store if you need to confirm availability.
      </p>
    ),
  },
  {
    question: "What payment method does GuptaMart support?",
    answer: (
      <p>
        GuptaMart currently supports cash payment only. You pay in cash when
        your order arrives. Online payment methods aren&apos;t supported.
      </p>
    ),
  },
];

/**
 * ContactFaq
 * Server component. Uses native <details>/<summary>, so it is keyboard
 * accessible and needs no client-side JavaScript or extra dependency.
 */
export default function ContactFaq() {
  return (
    <div className="space-y-3">
      {FAQS.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-2xl border border-[#bfcaba]/50 bg-white shadow-[0_4px_20px_rgba(45,66,50,0.04)] transition-shadow duration-200 open:shadow-[0_8px_30px_rgba(45,66,50,0.08)] motion-reduce:transition-none"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-sm font-semibold text-[#1a1c19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24]/50 sm:text-base [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown
              className="h-4 w-4 shrink-0 text-[#707a6c] transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5 text-sm leading-6 text-[#40493d]">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}