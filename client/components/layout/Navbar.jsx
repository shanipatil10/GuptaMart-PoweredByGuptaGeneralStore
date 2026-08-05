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
      className="group flex items-center gap-2.5 shrink-0"
      aria-label="GuptaMart home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-700 transition-transform duration-200 ease-out group-hover:scale-105">
        <Leaf className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[16px] font-semibold tracking-tight text-neutral-900">
          GuptaMart
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
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
    <ul className={`flex items-center gap-7 ${className}`}>
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onLinkClick}
            className="text-[13.5px] font-medium text-neutral-600 transition-colors duration-200 ease-out hover:text-green-700"
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
        className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder="Search fresh produce, groceries..."
        aria-label="Search products"
        className="h-9 w-full rounded-full border border-transparent bg-neutral-50 pl-9 text-[13.5px] text-neutral-700 placeholder:text-neutral-400 shadow-none transition-colors duration-200 ease-out hover:bg-neutral-100/80 focus-visible:border-green-600/30 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-green-600/40"
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
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-all duration-200 ease-out hover:bg-neutral-50 hover:text-green-700 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
      {badge ? (
        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-green-700 text-[9px] font-semibold text-white ring-2 ring-white">
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
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/90 shadow-[0_1px_2px_rgba(16,24,16,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav links */}
        <NavLinks className="hidden md:flex" />

        {/* Desktop search bar */}
        <SearchBar className="hidden md:block md:max-w-[220px] lg:max-w-xs" />

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
            className="h-9 w-9 rounded-full text-neutral-600 transition-all duration-200 ease-out hover:bg-neutral-50 hover:text-green-700 hover:scale-105 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
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