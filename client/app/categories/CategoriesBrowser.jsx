"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

const CATEGORIES = [
  {
    name: "Vegetables",
    slug: "vegetables",
    image: "/images/categories/vegetables.png",
  },
  {
    name: "Dessert",
    slug: "dessert",
    image: "/images/categories/dessert.png",
  },
  {
    name: "Dairy",
    slug: "dairy",
    image: "/images/categories/dairy.png",
  },
  {
    name: "Grains & Pulses",
    slug: "grains",
    image: "/images/categories/grains.png",
  },
  {
    name: "Snacks",
    slug: "snacks",
    image: "/images/categories/snacks.png",
  },
  {
    name: "Household",
    slug: "household",
    image: "/images/categories/household.png",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    slug: "vegetables",
    unit: "1 kg",
    price: 40,
    image: "/images/products/tomatoes.png",
  },
  {
    id: 2,
    name: "Aashirvaad Atta",
    category: "Grains & Pulses",
    slug: "grains",
    unit: "5 kg",
    price: 255,
    image: "/images/products/atta.png",
  },
  {
    id: 3,
    name: "Amul Taaza Milk",
    category: "Dairy",
    slug: "dairy",
    unit: "1 L",
    price: 32,
    image: "/images/products/milk.png",
  },
  {
    id: 4,
    name: "Parle-G Biscuits",
    category: "Snacks",
    slug: "snacks",
    unit: "200 g",
    price: 20,
    image: "/images/products/parle-g.png",
  },
];

const PRODUCT_CATEGORIES = [
  "Vegetables",
  "Grains & Pulses",
  "Dairy",
  "Snacks",
];

function HorizontalScroller({ children, ariaLabel }) {
  return (
    <div
      aria-label={ariaLabel}
      className="
        -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3
        scrollbar-none
        sm:-mx-6 sm:px-6
        lg:mx-0 lg:px-0
      "
    >
      {children}
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group w-[150px] shrink-0 snap-start sm:w-[170px] lg:w-auto lg:flex-1"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#ebf7ea]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 170px, 16vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex items-center justify-center gap-1">
        <span className="text-center text-sm font-medium text-[#1a1c19] sm:text-base">
          {category.name}
        </span>
      </div>
    </Link>
  );
}

function ProductRow({ title, slug, products }) {
  return (
    <section className="border-t border-[#1c6d24]/10 py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
            Fresh picks
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a1c19] md:text-3xl">
            {title}
          </h2>
        </div>

        <Link
          href={`/categories/${slug}`}
          className="group hidden shrink-0 items-center gap-1 text-sm font-medium text-[#1c6d24] sm:flex"
        >
          View category
          <ChevronRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <HorizontalScroller ariaLabel={`${title} products`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="
              w-[220px] shrink-0 snap-start
              animate-[categoryCardIn_450ms_ease-out_both]
              sm:w-[250px]
              lg:w-[280px]
          "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </HorizontalScroller>

      <Link
        href={`/categories/${slug}`}
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#1c6d24] sm:hidden"
      >
        View category
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

export default function CategoriesBrowser() {
  const availableProducts = PRODUCTS;

  return (
    <main className="min-h-screen bg-[#fafaf4]">
      <section className="mx-auto max-w-[1280px] px-5 pb-4 pt-14 sm:px-6 md:pt-20 lg:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
          GuptaMart
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-[#1a1c19] md:text-5xl">
              Browse Groceries
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-[#40493d]">
              Fresh produce and everyday essentials, organised by category
              for an easier shopping experience.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1c6d24]/15 px-5 py-2.5 text-sm font-medium text-[#1a1c19] transition-colors duration-200 hover:bg-[#ebf7ea]"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-8 sm:px-6 lg:px-16">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
            Shop by category
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a1c19]">
            What are you looking for?
          </h2>
        </div>

        <HorizontalScroller ariaLabel="Grocery categories">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </HorizontalScroller>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-16">
        <section className="border-t border-[#1c6d24]/10 py-10 md:py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
                Everything in one place
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a1c19] md:text-3xl">
                All Groceries
              </h2>
            </div>
          </div>

          <HorizontalScroller ariaLabel="All groceries">
            {availableProducts.map((product) => (
              <div
                key={product.id}
                className="
                  w-[220px] shrink-0 snap-start
                  animate-[categoryCardIn_450ms_ease-out_both]
                  sm:w-[250px]
                  lg:w-[280px]
                "
              >
                <ProductCard product={product} />
              </div>
            ))}
          </HorizontalScroller>
        </section>

        {PRODUCT_CATEGORIES.map((category) => {
          const products = PRODUCTS.filter(
            (product) => product.category === category
          );

          if (products.length === 0) {
            return null;
          }

          const categoryData = CATEGORIES.find(
            (item) => item.name === category
          );

          return (
            <ProductRow
              key={category}
              title={category}
              slug={categoryData?.slug ?? "categories"}
              products={products}
            />
          );
        })}
      </div>
    </main>
  );
}