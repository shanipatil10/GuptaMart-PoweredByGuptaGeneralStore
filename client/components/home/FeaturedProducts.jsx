import ProductCard from "@/components/product/ProductCard";

const FEATURED_PRODUCTS = [
  { id: 1, name: "Fresh Tomatoes", category: "Vegetables", unit: "1 kg", price: 40, image: "/images/products/tomatoes.jpg" },
  { id: 2, name: "Aashirvaad Atta", category: "Grains & Pulses", unit: "5 kg", price: 255, image: "/images/products/atta.jpg" },
  { id: 3, name: "Amul Taaza Milk", category: "Dairy", unit: "1 L", price: 32, image: "/images/products/milk.jpg" },
  { id: 4, name: "Parle-G Biscuits", category: "Snacks", unit: "200 g", price: 20, image: "/images/products/parle-g.jpg" },
];

/**
 * FeaturedProducts
 * "Popular Groceries" section. Static placeholder data for now — this
 * array is the seam where the Express + MySQL API will plug in later.
 */
export default function FeaturedProducts() {
  return (
    <section className="bg-[#f4f4ee] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-16">
        <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#1c6d24]">
          Featured
        </span>
        <h2 className="mt-2 text-[28px] font-semibold leading-[36px] tracking-tight text-[#1a1c19] md:text-[32px] md:leading-[40px]">
          Popular Groceries
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4 md:gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}