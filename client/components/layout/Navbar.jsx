"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/lib/data/products";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// products.js is the canonical source — search reads straight from it,
// no second product list.
const ALL_PRODUCTS = Object.values(PRODUCTS);

function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
  );
}

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
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-green-700 transition-transform duration-200 ease-out group-hover:scale-105">
        <Leaf className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
          GuptaMart
        </span>
        <span className="text-[9.5px] font-medium uppercase tracking-wider text-neutral-400">
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
  const pathname = usePathname();

  return (
    <ul className={`flex items-center gap-7 ${className}`}>
      {NAV_LINKS.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              aria-current={isActive ? "page" : undefined}
              className={`text-[13.5px] transition-all duration-200 ease-out hover:text-green-700 hover:-translate-y-0.5 ${
                isActive
                  ? "font-semibold text-green-700"
                  : "font-medium text-neutral-600"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * SearchResultRow
 * Compact result row for the search dropdown — deliberately not
 * ProductCard, which is a square grid card and doesn't fit a slim
 * list. Navigation happens via router.push on click/Enter, so this is
 * a <button role="option">, not a link — standard for combobox-style
 * widgets where the row is part of the search interaction, not a
 * plain hyperlink.
 */
function SearchResultRow({ product, onSelect }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected="false"
      onClick={() => onSelect(product)}
      className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors duration-150 ease-out hover:bg-[#ebf7ea] focus-visible:bg-[#ebf7ea] focus-visible:outline-none"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#ebf7ea]">
        <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-[#1a1c19]">
          {product.name}
        </span>
        <span className="block text-xs text-[#4e6452]">
          {product.category} • {product.unit}
        </span>
      </span>
      <span className="shrink-0 text-sm font-semibold text-[#1c6d24]">
        ₹{product.price}
      </span>
    </button>
  );
}

/**
 * SearchBar
 * Rounded search input, reusable across desktop and mobile layouts.
 * Each instance (desktop/mobile) owns its own query/open state — they
 * aren't shared, which is fine since they're never visible at once
 * (desktop search is md:flex, mobile panel is md:hidden).
 */
function SearchBar({ className = "" }) {
  const router = useRouter();
  const containerRef = useRef(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = searchProducts(query);
  const showDropdown = isOpen && query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(event) {
    setQuery(event.target.value);
    setIsOpen(true);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setIsOpen(false);
      event.currentTarget.blur();
    }
  }

  function handleSelect(product) {
    setQuery("");
    setIsOpen(false);
    router.push(`/product/${product.id}`);
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={query}
        onChange={handleChange}
        onFocus={() => query.trim() && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search fresh groceries..."
        aria-label="Search products"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="navbar-search-results"
        autoComplete="off"
        className="h-11 w-full rounded-full border border-transparent bg-neutral-100/70 pl-11 pr-4 text-[13.5px] text-neutral-700 placeholder:text-neutral-500 shadow-none transition-all duration-200 ease-out hover:bg-neutral-100 focus-visible:border-green-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:shadow-lg"
      />

      {showDropdown && (
        <div
          id="navbar-search-results"
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-80 overflow-y-auto rounded-2xl border border-neutral-100 bg-white p-2 shadow-[0_12px_32px_rgba(30,60,35,0.12)] animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {results.length > 0 ? (
            results.map((product) => (
              <SearchResultRow key={product.id} product={product} onSelect={handleSelect} />
            ))
          ) : (
            <p className="px-3 py-4 text-center text-sm text-neutral-500">
              No products found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * IconAction
 * Small reusable wrapper for icon buttons (cart, profile) with consistent
 * hover and focus states.
 */
function IconAction({ icon: Icon, label, badge, href = "#" }) {
  const hasBadge = badge != null;
  const isEmpty = badge === 0;

  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition-all duration-200 ease-out hover:bg-neutral-100 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
    >
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      {hasBadge ? (
        <span className={`absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-green-700 text-[9px] font-semibold text-white ring-2 ring-white transition-opacity duration-200 ${isEmpty ? "opacity-0" : "opacity-100"}`}>
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
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/55 shadow-[0_4px_24px_rgba(30,60,35,0.06)] backdrop-blur-xl supports-backdrop-filter:bg-white/45">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav links */}
        <NavLinks className="hidden md:flex" />

        {/* Desktop search bar — fills remaining space between links and icons */}
        <SearchBar className="hidden md:flex md:flex-1 md:max-w-2xl" />

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          {/* Desktop icon actions */}
          <div className="hidden items-center gap-1 md:flex">
            <IconAction icon={ShoppingCart} label="Shopping cart" badge={cartCount} href="/cart" />
            <IconAction icon={User} label="Your account" href="/account" />
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-neutral-600 transition-all duration-200 ease-out hover:bg-neutral-100 hover:text-green-700 md:hidden"
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