"use client";

import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
    return (
        <div className="flex flex-col bg-[#0d0907]" style={{ minHeight: "100dvh" }}>
            {/* Header */}
            <header className="flex items-center justify-between px-5 pt-safe pt-10 pb-3">
                <h1 className="text-white text-xl font-bold">Profile</h1>
                <button className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/50">settings</span>
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 px-5 py-2">
                {/* Profile card */}
                <div className="bg-[#171211] rounded-3xl p-5 text-center border border-white/10 mb-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#f46a25] to-[#d35a15] mx-auto mb-3 flex items-center justify-center text-3xl shadow-lg shadow-[#f46a25]/20">👤</div>
                    <h2 className="text-white text-lg font-bold">Foodie</h2>
                    <p className="text-white/40 text-sm mb-4">Bengaluru</p>
                    <div className="flex justify-center gap-8">
                        <div><p className="text-white text-xl font-bold">12</p><p className="text-white/30 text-xs">Matches</p></div>
                        <div><p className="text-white text-xl font-bold">3</p><p className="text-white/30 text-xs">Groups</p></div>
                        <div><p className="text-white text-xl font-bold">8</p><p className="text-white/30 text-xs">Friends</p></div>
                    </div>
                </div>

                {/* Menu */}
                <div className="space-y-2">
                    {[
                        { icon: "history", label: "Match History" },
                        { icon: "bookmark", label: "Saved Places", badge: "5" },
                        { icon: "payments", label: "Payment Methods" },
                        { icon: "help", label: "Help & Support" },
                    ].map(item => (
                        <button key={item.label} className="w-full flex items-center gap-3 p-3.5 bg-[#171211] rounded-2xl border border-white/5">
                            <span className="material-symbols-outlined text-white/40">{item.icon}</span>
                            <span className="flex-1 text-left text-white">{item.label}</span>
                            {item.badge && <span className="px-2 py-0.5 bg-[#f46a25] text-white text-xs font-bold rounded-full">{item.badge}</span>}
                            <span className="material-symbols-outlined text-white/15">chevron_right</span>
                        </button>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
