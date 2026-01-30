"use client";

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="fixed inset-0 bg-[#0f0a07] flex flex-col overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#f46a25]/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Logo */}
      <header className="relative z-10 flex items-center justify-center pt-14 pb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f46a25] to-[#d4520f] flex items-center justify-center shadow-lg shadow-[#f46a25]/40">
            <span className="text-white text-2xl font-black">S</span>
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">Swipaa</span>
        </div>
      </header>

      {/* Hero Image Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-8">
        <div className="relative w-full max-w-[280px]">
          {/* Floating cards behind */}
          <div className="absolute -left-4 -top-3 w-full h-full">
            <div className="w-full h-full rounded-[28px] bg-gradient-to-br from-[#3d2a1f] to-[#2a1c14] border border-white/10 -rotate-6 shadow-xl" />
          </div>
          <div className="absolute -right-4 -top-2 w-full h-full">
            <div className="w-full h-full rounded-[28px] bg-gradient-to-br from-[#3d2a1f] to-[#2a1c14] border border-white/10 rotate-6 shadow-xl" />
          </div>

          {/* Main card */}
          <div className="relative rounded-[28px] overflow-hidden shadow-2xl border border-white/10 aspect-[3/4] bg-[#1a1210]">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"
              alt="Restaurant"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Card content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#f46a25] to-[#e55815] mb-3 shadow-lg">
                <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <span className="text-white text-xs font-bold">Perfect Match</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-1">The Permit Room</h3>
              <p className="text-white/60 text-sm">Coastal • $$$ • 2.2 km</p>
            </div>
          </div>

          {/* Action buttons overlay */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1a1210] border border-white/10 flex items-center justify-center shadow-xl">
              <span className="material-symbols-outlined text-red-400 text-2xl">close</span>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f46a25] to-[#d4520f] flex items-center justify-center shadow-xl shadow-[#f46a25]/40">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#1a1210] border border-white/10 flex items-center justify-center shadow-xl">
              <span className="material-symbols-outlined text-blue-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="relative z-10 px-8 pb-12 pt-16">
        <h1 className="text-white text-[28px] font-extrabold text-center leading-tight mb-3">
          Dining decided,<br />
          <span className="bg-gradient-to-r from-[#f46a25] to-[#ff8c4a] bg-clip-text text-transparent">together.</span>
        </h1>
        <p className="text-white/40 text-center text-[15px] mb-8 max-w-[260px] mx-auto leading-relaxed">
          Swipe on restaurants with friends and find the perfect spot.
        </p>

        <Link
          href="/discover"
          className="block w-full bg-gradient-to-r from-[#f46a25] to-[#e55815] text-white text-lg font-bold py-4 rounded-2xl text-center shadow-xl shadow-[#f46a25]/30 active:scale-[0.98] transition-transform"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
