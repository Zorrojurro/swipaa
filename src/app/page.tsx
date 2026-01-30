"use client";

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div
      className="flex flex-col items-center justify-center px-8 text-center"
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #1a120d 0%, #0f0906 100%)"
      }}
    >
      {/* Main heading */}
      <h1 className="text-[32px] font-bold text-white leading-tight mb-4">
        Dining decided,<br />
        <span className="text-[#f46a25]">together.</span>
      </h1>

      {/* Description */}
      <p className="text-white/50 text-[17px] leading-relaxed mb-10 max-w-[300px]">
        Invite your friends, swipe on local favorites, and find the perfect spot in seconds.
      </p>

      {/* CTA Button */}
      <Link
        href="/discover"
        className="inline-flex items-center justify-center gap-2 w-full max-w-[320px] py-4 px-8 bg-[#f46a25] text-white font-semibold text-lg rounded-full"
      >
        Let&apos;s Eat
        <span className="text-xl">→</span>
      </Link>
    </div>
  );
}
