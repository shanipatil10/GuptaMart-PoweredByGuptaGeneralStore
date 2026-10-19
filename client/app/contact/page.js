import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactOptions from "@/components/contact/ContactOptions";
import ContactForm from "@/components/contact/ContactForm";
import ContactFaq from "@/components/contact/ContactFaq";

export const metadata = {
  title: "Contact | GuptaMart",
  description:
    "Get in touch with GuptaMart and Gupta General Store about groceries, orders and support.",
};

const MESSAGE_TIPS = [
  "Pick the topic that fits your question best.",
  "Mention the product name if you're asking about availability.",
  "Include what you ordered if you're asking about an order.",
];

/**
 * ContactPage
 * Server component; only ContactForm is a client component. Navbar and
 * Footer are rendered here like every other page — layout.js doesn't
 * render them globally.
 */
export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#fafaf4]">
        {/* A. Introduction */}
        <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-14 text-center sm:px-6 sm:pt-20 lg:px-16">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 motion-reduce:animate-none">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#ebf7ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1c6d24]" aria-hidden="true" />
              GuptaMart is here to help
            </span>

            <h1 className="mx-auto mt-5 max-w-3xl text-[32px] font-semibold leading-10 tracking-[-0.02em] text-[#1a1c19] sm:text-[44px] sm:leading-[52px]">
              Get in touch with GuptaMart
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#40493d]">
              Have a question about groceries, an order or anything else? Here
              is how to reach Gupta General Store.
            </p>
          </div>
        </section>

        {/* B. Contact options */}
        <section
          aria-label="Contact options"
          className="mx-auto max-w-[1280px] px-5 pb-14 sm:px-6 lg:px-16"
        >
          <ContactOptions />
        </section>

        {/* C. Contact form */}
        <section
          aria-labelledby="contact-form-heading"
          className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-6 lg:px-16"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
                Send a message
              </p>
              <h2
                id="contact-form-heading"
                className="mt-2 text-[24px] font-semibold leading-8 tracking-[-0.01em] text-[#1a1c19] sm:text-[28px] sm:leading-9"
              >
                Write to us
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#40493d] sm:text-base">
                Tell us what you need help with.
              </p>

              <ul className="mt-6 space-y-3">
                {MESSAGE_TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5 text-sm leading-5 text-[#40493d]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1c6d24]" aria-hidden="true" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>
        </section>

        {/* D. FAQ */}
        <section
          aria-labelledby="contact-faq-heading"
          className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-6 lg:px-16"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
                FAQ
              </p>
              <h2
                id="contact-faq-heading"
                className="mt-2 text-[24px] font-semibold leading-8 tracking-[-0.01em] text-[#1a1c19] sm:text-[28px] sm:leading-9"
              >
                Frequently asked questions
              </h2>
            </div>
            <ContactFaq />
          </div>
        </section>

        {/* E. Closing call to action */}
        <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-6 lg:px-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#ebf7ea] p-7 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-[22px] font-semibold leading-7 tracking-[-0.01em] text-[#1a1c19] sm:text-[26px] sm:leading-8">
                Ready to start shopping?
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#40493d]">
                Browse groceries and everyday essentials from Gupta General Store.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#1c6d24] px-6 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-[#155a1d] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24]/50 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Shop Groceries
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}