import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import Image from "next/image";

const categories = [
  {
    name: "Vegetables",
    image: "/images/categories/vegetables.png",
    href: "#vegetables",
  },
  {
    name: "Desserts",
    image: "/images/categories/dessert.png",
    href: "#desserts",
  },
  {
    name: "Dairy",
    image: "/images/categories/dairy.png",
    href: "#dairy",
  },
  {
    name: "Grains & Pulses",
    image: "/images/categories/grains.png",
    href: "#grains",
  },
  {
    name: "Snacks",
    image: "/images/categories/snacks.png",
    href: "#snacks",
  },
  {
    name: "Household",
    image: "/images/categories/household.png",
    href: "#household",
  },
];

const productSections = [
  {
    id: "vegetables",
    title: "Fresh Vegetables",
    products: [
      {
        id: "tomatoes",
        name: "Fresh Tomatoes",
        category: "Vegetables",
        unit: "1 kg",
        price: 40,
        image: "/images/products/tomatoes.png",
      },
      {
        id: "tomatoes-2",
        name: "Fresh Tomatoes",
        category: "Vegetables",
        unit: "500 g",
        price: 25,
        image: "/images/products/tomatoes.png",
      },
      {
        id: "tomatoes-3",
        name: "Fresh Tomatoes",
        category: "Vegetables",
        unit: "2 kg",
        price: 75,
        image: "/images/products/tomatoes.png",
      },
    ],
  },

  {
    id: "desserts",
    title: "Desserts",
    products: [
      {
        id: "dessert-1",
        name: "Fresh Dessert",
        category: "Desserts",
        unit: "1 pack",
        price: 80,
        image: "/images/categories/dessert.png",
      },
      {
        id: "dessert-2",
        name: "Dessert Special",
        category: "Desserts",
        unit: "500 g",
        price: 120,
        image: "/images/categories/dessert.png",
      },
      {
        id: "dessert-3",
        name: "Sweet Treat",
        category: "Desserts",
        unit: "1 pack",
        price: 60,
        image: "/images/categories/dessert.png",
      },
    ],
  },

  {
    id: "dairy",
    title: "Dairy & Milk",
    products: [
      {
        id: "milk",
        name: "Amul Taaza Milk",
        category: "Dairy",
        unit: "1 L",
        price: 32,
        image: "/images/products/milk.png",
      },
      {
        id: "milk-2",
        name: "Amul Taaza Milk",
        category: "Dairy",
        unit: "500 ml",
        price: 18,
        image: "/images/products/milk.png",
      },
      {
        id: "milk-3",
        name: "Amul Taaza Milk",
        category: "Dairy",
        unit: "2 L",
        price: 62,
        image: "/images/products/milk.png",
      },
    ],
  },

  {
    id: "grains",
    title: "Grains & Pulses",
    products: [
      {
        id: "atta",
        name: "Aashirvaad Atta",
        category: "Grains & Pulses",
        unit: "5 kg",
        price: 255,
        image: "/images/products/atta.png",
      },
      {
        id: "atta-2",
        name: "Aashirvaad Atta",
        category: "Grains & Pulses",
        unit: "10 kg",
        price: 490,
        image: "/images/products/atta.png",
      },
      {
        id: "atta-3",
        name: "Aashirvaad Atta",
        category: "Grains & Pulses",
        unit: "2 kg",
        price: 110,
        image: "/images/products/atta.png",
      },
    ],
  },

  {
    id: "snacks",
    title: "Snacks & Biscuits",
    products: [
      {
        id: "parle-g",
        name: "Parle-G Biscuits",
        category: "Snacks",
        unit: "200 g",
        price: 20,
        image: "/images/products/parle-g.png",
      },
      {
        id: "parle-g-2",
        name: "Parle-G Biscuits",
        category: "Snacks",
        unit: "800 g",
        price: 80,
        image: "/images/products/parle-g.png",
      },
      {
        id: "parle-g-3",
        name: "Parle-G Biscuits",
        category: "Snacks",
        unit: "100 g",
        price: 10,
        image: "/images/products/parle-g.png",
      },
    ],
  },

  {
    id: "household",
    title: "Household Essentials",
    products: [
      {
        id: "household-1",
        name: "Household Essentials",
        category: "Household",
        unit: "1 pack",
        price: 100,
        image: "/images/categories/household.png",
      },
      {
        id: "household-2",
        name: "Daily Home Essentials",
        category: "Household",
        unit: "1 pack",
        price: 150,
        image: "/images/categories/household.png",
      },
      {
        id: "household-3",
        name: "Home Care Essentials",
        category: "Household",
        unit: "1 pack",
        price: 120,
        image: "/images/categories/household.png",
      },
    ],
  },
];

function CategorySection({ section }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
            {section.title}
          </p>

          <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.01em] text-[#1a1c19] sm:text-[28px] sm:leading-9">
            {section.title}
          </h2>
        </div>

        <a
          href={`#${section.id}`}
          className="hidden text-sm font-semibold text-[#1c6d24] transition-opacity hover:opacity-70 sm:block"
        >
          View all
        </a>
      </div>

      <div
        className="
          flex gap-5 overflow-x-auto pb-4
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {section.products.map((product) => (
          <div
            key={product.id}
            className="
              w-[250px]
              shrink-0
              transition-transform
              duration-300
              ease-out
              hover:-translate-y-1
              sm:w-[270px]
              lg:w-[280px]
            "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CategoriesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafaf4]">
        {/* Header */}
        <section className="mx-auto max-w-[1280px] px-5 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
            GuptaMart
          </p>

          <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.01em] text-[#1a1c19] sm:text-[40px] sm:leading-[48px]">
            Shop by Category
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-6 text-[#40493d]">
            Fresh groceries and everyday essentials, all in one place.
          </p>
        </section>

        {/* Category strip */}
        <section className="mx-auto max-w-[1280px] px-5 pb-14 sm:px-6 lg:px-16">
          <div
            className="
              flex gap-4 overflow-x-auto pb-2
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="
                  group
                  w-[145px]
                  shrink-0
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow-[0_4px_20px_rgba(45,66,50,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_8px_30px_rgba(45,66,50,0.10)]
                "
              >
                <div className="relative aspect-square overflow-hidden bg-[#ebf7ea]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="145px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="px-3 py-3 text-center">
                  <span className="text-sm font-semibold text-[#1a1c19]">
                    {category.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Product sections */}
        <section className="mx-auto max-w-[1280px] space-y-14 px-5 pb-20 sm:px-6 lg:px-16">
          {productSections.map((section) => (
            <CategorySection key={section.id} section={section} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}