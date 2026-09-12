"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileSection from "@/components/account/ProfileSection";
import SecurityCard from "@/components/account/SecurityCard";
import OrderHistory from "@/components/account/OrderHistory";
import CartOverview from "@/components/account/CartOverview";
import { useAuth } from "@/context/AuthContext";

function AccountSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-16">
      <div className="h-4 w-24 animate-pulse rounded-lg bg-[#ebf7ea]" />
      <div className="mt-3 h-8 w-56 animate-pulse rounded-lg bg-[#ebf7ea]" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="h-40 animate-pulse rounded-3xl bg-white" />
          <div className="h-52 animate-pulse rounded-3xl bg-white" />
        </div>
        <div className="space-y-6">
          <div className="h-40 animate-pulse rounded-3xl bg-white" />
          <div className="h-60 animate-pulse rounded-3xl bg-white" />
        </div>
      </div>
    </div>
  );
}

/**
 * AccountPage
 * Protected route: reuses the existing AuthContext rather than a
 * second auth mechanism. While Firebase's auth state is resolving, or
 * for the brief instant before an unauthenticated user is redirected,
 * a skeleton renders instead of any real (or fake) account data.
 */
export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const showSkeleton = loading || !user;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafaf4]">
        {showSkeleton ? (
          <AccountSkeleton />
        ) : (
          <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-16">
            <section className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1c6d24]">
                Account
              </p>
              <h1 className="mt-1 text-[28px] font-semibold leading-9 tracking-[-0.01em] text-[#1a1c19] sm:text-[32px] sm:leading-10">
                Your Account
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#707a6c]">
                Manage your profile, security and orders.
              </p>
            </section>

            <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* Main column */}
              <div className="space-y-6">
                <ProfileSection user={user} />
                <OrderHistory />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <CartOverview />
                <SecurityCard user={user} />
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}