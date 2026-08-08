import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  { name: "Vegetables", image: "/images/categories/vegetables.jpg", href: "/categories/vegetables" },
  { name: "Fruits", image: "/images/categories/fruits.jpg", href: "/categories/fruits" },
  { name: "Dairy", image: "/images/categories/dairy.jpg", href: "/categories/dairy" },
  { name: "Grains & Pulses", image: "/images/categories/grains.jpg", href: "/categories/grains" },
  { name: "Snacks", image: "/images/categories/snacks.jpg", href: "/categories/snacks" },
  { name: "Household", image: "/images/categories/household.jpg", href: "/categories/household" },
];

/**
 * CategoryGrid
 * "Shop by Category" section. Categories are read from a small static
 * array so this can be swapped for API data later without touching the
 * markup below.
 */
export default function CategoryGrid() {
  return (
    <section className="bg-[#fafaf4] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-16">
        <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#1c6d24]">
          Categories
        </span>
        <h2 className="mt-2 text-[28px] font-semibold leading-[36px] tracking-tight text-[#1a1c19] md:text-[32px] md:leading-[40px]">
          Shop by Category
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {CATEGORIES.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#ebf7ea]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-[#1a1c19] sm:text-base">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}