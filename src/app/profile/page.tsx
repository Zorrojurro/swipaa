"use client";

import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="flex flex-col" style={{ minHeight: "100dvh", background: "#1a120d" }}>
            <header className="flex items-center justify-between px-5 pt-12 pb-3">
                <h1 className="text-white text-2xl font-bold">Profile</h1>
                <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60">settings</span>
                </button>
            </header>

            <main className="flex-1 px-5 py-2">
                <div className="bg-white/5 rounded-2xl p-5 text-center mb-5">
                    <div className="h-16 w-16 rounded-full bg-[#f46a25] mx-auto mb-3 flex items-center justify-center text-3xl">👤</div>
                    <h2 className="text-white text-lg font-bold">Foodie</h2>
                    <p className="text-white/50 text-sm mb-4">Bengaluru</p>
                    <div className="flex justify-center gap-8">
                        <div><p className="text-white text-xl font-bold">12</p><p className="text-white/40 text-xs">Matches</p></div>
                        <div><p className="text-white text-xl font-bold">3</p><p className="text-white/40 text-xs">Groups</p></div>
                        <div><p className="text-white text-xl font-bold">8</p><p className="text-white/40 text-xs">Friends</p></div>
                    </div>
                </div>

                <div className="space-y-2">
                    {[
                        { icon: "history", label: "Match History" },
                        { icon: "bookmark", label: "Saved Places", badge: "5" },
                        { icon: "payments", label: "Payment Methods" },
                        { icon: "help", label: "Help & Support" },
                    ].map(item => (
                        <button key={item.label} className="w-full flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                            <span className="material-symbols-outlined text-white/50">{item.icon}</span>
                            <span className="flex-1 text-left text-white">{item.label}</span>
                            {item.badge && <span className="px-2 py-0.5 bg-[#f46a25] text-white text-xs font-bold rounded-full">{item.badge}</span>}
                            <span className="material-symbols-outlined text-white/20">chevron_right</span>
                        </button>
                    ))}
                </div>
            </main>

            <nav className="flex justify-around items-center px-6 py-3 pb-6 border-t border-white/10">
                {[
                    { icon: "home", href: "/discover" },
                    { icon: "search", href: "/search" },
                    { icon: "group", href: "/group" },
                    { icon: "person", href: "/profile", active: true },
                ].map(item => (
                    <Link key={item.href} href={item.href} className={item.active ? "text-[#f46a25]" : "text-white/40"}>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
