"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Logo
 * Text-based placeholder logo for Gupta General Store / GuptaMart.
 */
function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 shrink-0"
      aria-label="GuptaMart home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
        <Leaf className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-medium tracking-tight text-neutral-900">
          GuptaMart
        </span>
        <span className="text-[11px] font-medium tracking-wide text-neutral-500">
          Gupta General Store
        </span>
      </span>
    </Link>
  );
}

/**
 * NavLinks
 * Primary navigation links. Rendered inline on desktop, stacked on mobile.
 */
function NavLinks({ className = "", onLinkClick }) {
  return (
    <ul className={`flex items-center gap-8 ${className}`}>
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onLinkClick}
            className="text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-green-700"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * SearchBar
 * Rounded search input, reusable across desktop and mobile layouts.
 */
function SearchBar({ className = "" }) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder="Search fresh produce, groceries..."
        aria-label="Search products"
        className="h-10 w-full rounded-full border-neutral-200 bg-neutral-50 pl-10 text-sm placeholder:text-neutral-400 focus-visible:ring-green-600"
      />
    </div>
  );
}

/**
 * IconAction
 * Small reusable wrapper for icon buttons (cart, profile) with consistent
 * hover and focus states.
 */
function IconAction({ icon: Icon, label, badge, href = "#" }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
    >
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      {badge ? (
        <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-700 text-[10px] font-medium text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

/**
 * Navbar
 * Sticky top navigation for Gupta General Store. White background,
 * subtle bottom border, rounded search bar, and quick access to cart
 * and profile. Desktop-first, collapses into a mobile menu below the
 * md breakpoint.
 */
export default function Navbar({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav links */}
        <NavLinks className="hidden md:flex" />

        {/* Desktop search bar */}
        <SearchBar className="hidden md:block md:max-w-xs lg:max-w-sm" />

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          {/* Desktop icon actions */}
          <div className="hidden items-center gap-1 md:flex">
            <IconAction icon={ShoppingCart} label="Shopping cart" badge={cartCount > 0 ? cartCount : null} href="/cart" />
            <IconAction icon={User} label="Your account" href="/account" />
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-neutral-600 hover:bg-neutral-50 hover:text-green-700 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="border-t border-neutral-100 bg-white px-4 py-4 sm:px-6 md:hidden">
          <SearchBar className="mb-4" />
          <NavLinks
            className="flex-col items-start gap-4"
            onLinkClick={() => setIsMenuOpen(false)}
          />
          <div className="mt-4 flex items-center gap-2 border-t border-neutral-100 pt-4">
            <IconAction icon={ShoppingCart} label="Shopping cart" badge={cartCount > 0 ? cartCount : null} href="/cart" />
            <IconAction icon={User} label="Your account" href="/account" />
          </div>
        </div>
      )}
    </header>
  );
}