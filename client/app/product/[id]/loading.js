import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-full bg-[#ebf7ea] motion-reduce:animate-none ${className}`}
    />
  );
}

/**
 * Loading (Product Details)
 * Route-specific skeleton matching ProductDetails.jsx's two-column
 * layout (image left, breadcrumb/name/price/description/highlights/
 * quantity/buttons right), so real content doesn't visibly jump once
 * it arrives. Takes priority over the root app/loading.js specifically
 * for /product/[id] navigations. No data, no client state — static
 * pulsing blocks via Tailwind's built-in animate-pulse only.
 *
 * product/[id]/page.js itself is untouched.
 */
export default function ProductLoading() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafaf4]">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            {/* Image */}
            <div className="aspect-square w-full animate-pulse rounded-3xl bg-[#ebf7ea] motion-reduce:animate-none" />

            {/* Info */}
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="h-3 w-3" />
                <SkeletonBlock className="h-3 w-16" />
              </div>

              {/* Name */}
              <SkeletonBlock className="mt-4 h-9 w-3/4 rounded-xl" />

              {/* Price */}
              <SkeletonBlock className="mt-4 h-7 w-28 rounded-lg" />

              {/* Description */}
              <div className="mt-5 space-y-2">
                <SkeletonBlock className="h-4 w-full rounded-lg" />
                <SkeletonBlock className="h-4 w-5/6 rounded-lg" />
              </div>

              {/* Highlights */}
              <div className="mt-4 space-y-2">
                <SkeletonBlock className="h-3.5 w-2/3 rounded-lg" />
                <SkeletonBlock className="h-3.5 w-1/2 rounded-lg" />
              </div>

              {/* Quantity selector */}
              <SkeletonBlock className="mt-6 h-10 w-32 rounded-full" />

              {/* Add to cart + save */}
              <div className="mt-6 flex gap-3">
                <SkeletonBlock className="h-12 flex-1 rounded-full" />
                <SkeletonBlock className="h-12 w-12 rounded-full" />
              </div>

              {/* Trust chips */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <SkeletonBlock className="h-14 rounded-2xl" />
                <SkeletonBlock className="h-14 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}