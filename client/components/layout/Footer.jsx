import Link from "next/link";
import { Leaf } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Footer
 * Minimal site footer. Contact details are clearly marked placeholders
 * rather than invented information — swap them in once the store
 * confirms real address/phone/email/hours.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1c6d24]/10 bg-[#fafaf4]">
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ebf7ea] text-[#1c6d24]">
                <Leaf className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold tracking-tight text-[#1a1c19]">
                GuptaMart
              </span>
            </div>
            <p className="mt-3 text-sm leading-[20px] text-[#40493d]">
              Gupta General Store — quality everyday essentials and fresh
              produce for the community.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.05em] text-[#1c6d24]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#40493d] transition-colors duration-200 hover:text-[#1c6d24]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store info — placeholders only, nothing invented */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.05em] text-[#1c6d24]">
              Store Information
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#40493d]">
              <li>Address: to be added</li>
              <li>Phone: to be added</li>
              <li>Store hours: to be added</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.05em] text-[#1c6d24]">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#40493d]">
              <li>Email: to be added</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1c6d24]/10 pt-6">
          <p className="text-xs text-[#707a6c]">
            © {year} Gupta General Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}