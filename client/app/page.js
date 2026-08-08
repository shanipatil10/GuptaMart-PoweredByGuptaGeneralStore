import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import TrustSection from "@/components/home/TrustSection";

export const metadata = {
  title: "GuptaMart | Fresh Groceries from Gupta General Store",
  description:
    "Shop fresh vegetables, fruits, dairy, grains and everyday essentials from Gupta General Store. Cash on delivery available.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#fafaf4]">
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <AboutSection />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}