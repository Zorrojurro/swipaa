"use client";

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div
      className="flex flex-col bg-[#0d0907]"
      style={{ minHeight: "100dvh" }}
    >
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[#f46a25]/10 to-transparent" />

      {/* Header */}
      <header className="relative flex items-center justify-center pt-safe pt-12 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#f46a25] to-[#d35a15] flex items-center justify-center">
            <span className="text-white text-xl font-black">S</span>
          </div>
          <span className="text-white text-xl font-bold">Swipaa</span>
        </div>
      </header>

      {/* Card Preview - takes remaining space */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-8 py-4">
        <div className="relative w-full max-w-[260px]">
          {/* Background cards */}
          <div className="absolute inset-0 rounded-3xl bg-[#1a1411] border border-white/5 -rotate-6 scale-95" />
          <div className="absolute inset-0 rounded-3xl bg-[#1a1411] border border-white/5 rotate-3 scale-[0.97]" />

          {/* Main card */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500"
              alt="Restaurant"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f46a25] mb-2">
                <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <span className="text-white text-[11px] font-bold">Perfect Match</span>
              </div>
              <h3 className="text-white text-lg font-bold">The Permit Room</h3>
              <p className="text-white/60 text-sm">Coastal • 2.2 km</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-5 mt-6">
          <div className="h-12 w-12 rounded-full bg-[#171211] border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-400 text-xl">close</span>
          </div>
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#f46a25] to-[#d35a15] flex items-center justify-center shadow-lg shadow-[#f46a25]/25">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div className="h-12 w-12 rounded-full bg-[#171211] border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
        </div>
      </main>

      {/* Bottom section */}
      <footer className="relative px-6 pb-safe pb-8 pt-4">
        <h1 className="text-center text-[26px] font-extrabold text-white leading-tight mb-2">
          Dining decided,{" "}
          <span className="text-[#f46a25]">together.</span>
        </h1>
        <p className="text-center text-white/40 text-sm mb-6 max-w-[280px] mx-auto">
          Swipe on restaurants with friends and find the perfect spot.
        </p>
        <Link
          href="/discover"
          className="block w-full max-w-sm mx-auto bg-gradient-to-r from-[#f46a25] to-[#d35a15] text-white text-base font-bold py-4 rounded-2xl text-center shadow-lg shadow-[#f46a25]/20"
        >
          Get Started
        </Link>
      </footer>
    </div>
  );
}
