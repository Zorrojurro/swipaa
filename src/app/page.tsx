"use client";

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="relative flex flex-col bg-black overflow-hidden" style={{ minHeight: "100dvh" }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Logo */}
        <header className="flex items-center justify-center pt-16">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] via-[#F7931E] to-[#FF6B35] flex items-center justify-center shadow-xl shadow-orange-500/30">
              <span className="text-white text-2xl font-black tracking-tight">S</span>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">Swipaa</span>
          </div>
        </header>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Hero text */}
        <div className="px-8 pb-6">
          <h1 className="text-[42px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            Find your<br />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FFB347] bg-clip-text text-transparent">
              perfect spot
            </span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-[300px]">
            Swipe through restaurants with friends. Match on where to eat together.
          </p>
        </div>

        {/* CTA section */}
        <div className="px-6 pb-10 space-y-4">
          <Link
            href="/discover"
            className="block w-full py-[18px] rounded-2xl text-center font-bold text-lg text-white
              bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FF6B35] bg-[length:200%_100%]
              shadow-[0_8px_32px_rgba(247,147,30,0.4)]
              hover:bg-[position:right_center] transition-all duration-300
              active:scale-[0.98] active:shadow-[0_4px_16px_rgba(247,147,30,0.3)]"
          >
            Get Started
          </Link>

          <p className="text-center text-white/30 text-sm">
            Already have an account?{" "}
            <span className="text-white/60 underline underline-offset-2">Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}
