"use client";

import Link from "next/link";
import { restaurants } from "@/data/restaurants";

export default function OnboardingPage() {
  const previewRestaurant = restaurants[1]; // Truffles - burger for visual appeal

  return (
    <div className="relative flex h-dvh w-full flex-col justify-between overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#f46a25]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header / Page Indicators */}
      <div className="z-10 flex w-full flex-col items-center justify-center pt-8 pb-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-8 rounded-full bg-[#f46a25] shadow-[0_0_10px_rgba(244,106,37,0.5)]" />
        </div>
      </div>

      {/* Main Content Area: Card Stack */}
      <div className="z-10 flex flex-col flex-grow items-center justify-center w-full px-6 relative py-4">
        {/* Card Stack Container */}
        <div className="relative w-full max-w-[340px] aspect-[3/4] flex items-center justify-center">
          {/* Background Card 3 (Furthest) */}
          <div className="absolute top-0 w-[90%] h-[90%] bg-[#2e1e17] rounded-2xl opacity-40 transform translate-y-[-20px] scale-90 border border-white/5" />

          {/* Background Card 2 (Middle) */}
          <div className="absolute top-4 w-[95%] h-[95%] bg-[#2e1e17] rounded-2xl opacity-70 transform translate-y-[-10px] scale-95 shadow-xl border border-white/10 rotate-[-2deg]" />

          {/* Main Active Card (Front) */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform rotate-[2deg] transition-transform duration-500 hover:scale-[1.02] group cursor-pointer border border-white/10 bg-[#2e1e17]">
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${previewRestaurant.image}')` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
            </div>

            {/* Card Content Overlay */}
            <div className="absolute bottom-0 w-full p-5 flex flex-col gap-1">
              {/* Match Badge */}
              <div className="inline-flex self-start items-center px-2.5 py-1 rounded-full bg-[#f46a25]/90 backdrop-blur-sm mb-2 shadow-lg border border-white/10">
                <span className="material-symbols-outlined text-white text-[14px] mr-1">bolt</span>
                <span className="text-white text-xs font-bold tracking-wide">98% Match</span>
              </div>
              <h2 className="text-white text-2xl font-bold leading-tight drop-shadow-md">
                {previewRestaurant.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-300 text-sm font-medium mt-1">
                <span>$$</span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{previewRestaurant.cuisine}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{previewRestaurant.distance}</span>
              </div>
            </div>
          </div>

          {/* Floating Reaction Buttons */}
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-8 mt-8 w-full">
            {/* Pass Button */}
            <button className="group flex items-center justify-center w-14 h-14 rounded-full glass-card border-red-500/30 hover:bg-red-500/20 hover:border-red-500 transition-all active:scale-95 shadow-lg shadow-black/20">
              <span className="material-symbols-outlined text-red-400 text-[28px] group-hover:scale-110 transition-transform font-bold">close</span>
            </button>

            {/* Super Like */}
            <button className="group flex items-center justify-center w-10 h-10 rounded-full glass-card border-blue-400/30 hover:bg-blue-500/20 hover:border-blue-500 transition-all active:scale-95">
              <span className="material-symbols-outlined text-blue-400 text-[20px] group-hover:scale-110 transition-transform">star</span>
            </button>

            {/* Like Button */}
            <button className="group flex items-center justify-center w-14 h-14 rounded-full glass-card border-green-500/30 hover:bg-green-500/20 hover:border-green-500 transition-all active:scale-95 shadow-lg shadow-black/20 bg-green-500/10">
              <span className="material-symbols-outlined text-green-400 text-[28px] group-hover:scale-110 transition-transform font-bold">favorite</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet / CTA Area */}
      <div className="z-20 w-full glass-panel rounded-t-[2.5rem] pt-8 pb-10 px-6 flex flex-col items-center text-center shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <h1 className="text-white text-[32px] font-extrabold leading-tight tracking-tight mb-3">
          Dining decided, <span className="text-[#f46a25]">together.</span>
        </h1>
        <p className="text-gray-400 text-base font-normal leading-relaxed max-w-xs mb-8">
          Invite your friends, swipe on local favorites, and find the perfect spot in seconds.
        </p>
        <Link
          href="/discover"
          className="w-full max-w-sm bg-[#f46a25] hover:bg-orange-600 text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-[0_8px_20px_rgba(244,106,37,0.3)] hover:shadow-[0_12px_24px_rgba(244,106,37,0.4)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 pulse-glow"
        >
          <span>Let&apos;s Eat</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>

        {/* Safe area spacer */}
        <div className="h-2" />
      </div>
    </div>
  );
}
