import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import ProductDetails from "@/components/product/ProductDetails";
import { getProductById, getRelatedProducts } from "@/lib/data/products";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Product Not Found | GuptaMart" };
  }

  return {
    title: `${product.name} | GuptaMart`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafaf4]">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-16">
          <ProductDetails product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-6 lg:px-16">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
                  Curated For You
                </p>
                <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.01em] text-[#1a1c19] sm:text-[28px] sm:leading-9">
                  You Might Also Like
                </h2>
              </div>
              <a
                href="/categories"
                className="hidden text-sm font-semibold text-[#1c6d24] transition-opacity hover:opacity-70 sm:block"
              >
                See all products
              </a>
            </div>

            <div className="grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}