"use client";

import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
    return (
        <div className="flex flex-col bg-black" style={{ minHeight: "100dvh" }}>
            {/* Header */}
            <header className="flex items-center justify-between px-5 pt-14 pb-4">
                <h1 className="text-white text-2xl font-bold tracking-tight">Profile</h1>
                <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/50">settings</span>
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 px-5 py-2 overflow-y-auto">
                {/* Profile card */}
                <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] rounded-3xl p-6 text-center border border-white/10 mb-5">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#F7931E] mx-auto mb-4 flex items-center justify-center text-4xl shadow-xl shadow-orange-500/20">
                        👤
                    </div>
                    <h2 className="text-white text-xl font-bold tracking-tight">Foodie</h2>
                    <p className="text-white/40 text-sm mb-5">Bengaluru</p>
                    <div className="flex justify-center gap-10">
                        <div>
                            <p className="text-white text-2xl font-bold">12</p>
                            <p className="text-white/30 text-xs font-medium">Matches</p>
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold">3</p>
                            <p className="text-white/30 text-xs font-medium">Groups</p>
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold">8</p>
                            <p className="text-white/30 text-xs font-medium">Friends</p>
                        </div>
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
                        <button key={item.label} className="w-full flex items-center gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors">
                            <span className="material-symbols-outlined text-white/40">{item.icon}</span>
                            <span className="flex-1 text-left text-white font-medium">{item.label}</span>
                            {item.badge && <span className="px-2.5 py-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white text-xs font-bold rounded-full">{item.badge}</span>}
                            <span className="material-symbols-outlined text-white/15">chevron_right</span>
                        </button>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
