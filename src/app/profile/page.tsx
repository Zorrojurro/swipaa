"use client";

import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="fixed inset-0 bg-[#0f0a07] flex flex-col overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#f46a25]/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-5 pt-14 pb-4">
                <h1 className="text-white text-2xl font-bold">Profile</h1>
                <button className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60">settings</span>
                </button>
            </header>

            {/* Content */}
            <main className="relative z-10 flex-1 flex flex-col px-5 pb-24 overflow-hidden">
                {/* Profile card */}
                <div className="bg-gradient-to-b from-[#1a1210] to-[#120e0a] rounded-3xl p-6 text-center border border-white/10 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f46a25] to-[#d4520f] mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg shadow-[#f46a25]/30">
                        👤
                    </div>
                    <h2 className="text-white text-xl font-bold mb-1">Foodie</h2>
                    <p className="text-white/40 text-sm mb-5">Bengaluru</p>

                    <div className="flex justify-center gap-10">
                        <div className="text-center">
                            <p className="text-white text-2xl font-bold">12</p>
                            <p className="text-white/30 text-xs">Matches</p>
                        </div>
                        <div className="text-center">
                            <p className="text-white text-2xl font-bold">3</p>
                            <p className="text-white/30 text-xs">Groups</p>
                        </div>
                        <div className="text-center">
                            <p className="text-white text-2xl font-bold">8</p>
                            <p className="text-white/30 text-xs">Friends</p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="space-y-2 flex-1">
                    {[
                        { icon: "history", label: "Match History" },
                        { icon: "bookmark", label: "Saved Places", badge: "5" },
                        { icon: "payments", label: "Payment Methods" },
                        { icon: "help", label: "Help & Support" },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className="w-full flex items-center gap-4 p-4 bg-[#1a1210] rounded-2xl border border-white/5"
                        >
                            <span className="material-symbols-outlined text-white/40">{item.icon}</span>
                            <span className="flex-1 text-left text-white font-medium">{item.label}</span>
                            {item.badge && (
                                <span className="px-2 py-0.5 bg-[#f46a25] text-white text-xs font-bold rounded-full">{item.badge}</span>
                            )}
                            <span className="material-symbols-outlined text-white/15">chevron_right</span>
                        </button>
                    ))}
                </div>
            </main>

            {/* Bottom Nav */}
            <nav className="absolute bottom-0 left-0 right-0 bg-[#0f0a07]/95 backdrop-blur-xl border-t border-white/5 px-8 pt-3 pb-8">
                <div className="flex justify-between items-center max-w-[300px] mx-auto">
                    {[
                        { icon: "home", href: "/discover", active: false },
                        { icon: "search", href: "/search", active: false },
                        { icon: "group", href: "/group", active: false },
                        { icon: "person", href: "/profile", active: true },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`p-2 ${item.active ? "text-[#f46a25]" : "text-white/30"}`}
                        >
                            <span
                                className="material-symbols-outlined text-2xl"
                                style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}
                            >
                                {item.icon}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
