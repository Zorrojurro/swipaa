"use client";

import Link from "next/link";
import { restaurants } from "@/data/restaurants";

export default function OnboardingPage() {
  const previewRestaurant = restaurants[14]; // Rameshwaram Cafe - trending

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-[#1a120d]">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] bg-[#f46a25]/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[50vw] h-[50vw] max-w-[300px] max-h-[300px] bg-orange-600/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Logo & Header */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f46a25] to-[#e55a15] flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-black">S</span>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">Swipaa</span>
        </div>
        <Link
          href="/discover"
          className="text-white/60 text-sm font-medium hover:text-white transition-colors"
        >
          Skip
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-6">
        {/* Card Preview */}
        <div className="relative w-full max-w-[300px] mx-auto mb-8">
          {/* Stacked cards behind */}
          <div className="absolute inset-x-4 top-4 h-full bg-[#2a1f1a] rounded-3xl -rotate-3 opacity-40" />
          <div className="absolute inset-x-2 top-2 h-full bg-[#2a1f1a] rounded-3xl rotate-2 opacity-60" />

          {/* Main card */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5]">
            <img
              src={previewRestaurant.image}
              alt={previewRestaurant.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Card content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f46a25] mb-3">
                <span className="material-symbols-outlined text-white text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span className="text-white text-xs font-bold">Trending</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-1">{previewRestaurant.name}</h3>
              <p className="text-white/60 text-sm">{previewRestaurant.cuisine} • {previewRestaurant.distance}</p>
            </div>
          </div>
        </div>

        {/* Action buttons preview */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-400 text-2xl">close</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#f46a25] flex items-center justify-center shadow-lg shadow-[#f46a25]/30">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="relative z-10 px-5 pb-10 pt-6">
        <div className="text-center mb-6">
          <h1 className="text-white text-3xl font-extrabold mb-3 leading-tight">
            Dining decided,<br />
            <span className="text-[#f46a25]">together.</span>
          </h1>
          <p className="text-white/50 text-base max-w-[280px] mx-auto leading-relaxed">
            Swipe on restaurants with friends. Find the perfect spot everyone loves.
          </p>
        </div>

        <Link
          href="/discover"
          className="block w-full bg-[#f46a25] text-white text-lg font-bold py-4 rounded-2xl text-center shadow-lg shadow-[#f46a25]/25 active:scale-[0.98] transition-transform"
        >
          Get Started
        </Link>

        {/* Page indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-8 h-2 rounded-full bg-[#f46a25]" />
        </div>
      </div>
    </div>
  );
}
