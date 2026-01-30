"use client";

import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
    return (
        <div className="min-h-dvh bg-[#1a120d] flex flex-col">
            {/* Header */}
            <div className="px-5 pt-12 pb-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-white text-2xl font-bold">Profile</h1>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/60">settings</span>
                    </button>
                </div>

                {/* Profile card */}
                <div className="bg-[#2a1f1a] rounded-2xl p-6 text-center border border-white/5">
                    <div className="w-20 h-20 rounded-full bg-[#f46a25]/20 mx-auto mb-4 flex items-center justify-center text-4xl border-2 border-[#f46a25]">
                        👤
                    </div>
                    <h2 className="text-white text-xl font-bold mb-1">Foodie</h2>
                    <p className="text-white/40 text-sm mb-4">Bengaluru</p>

                    <div className="flex justify-center gap-8">
                        <div className="text-center">
                            <p className="text-white text-2xl font-bold">12</p>
                            <p className="text-white/40 text-xs">Matches</p>
                        </div>
                        <div className="text-center">
                            <p className="text-white text-2xl font-bold">3</p>
                            <p className="text-white/40 text-xs">Groups</p>
                        </div>
                        <div className="text-center">
                            <p className="text-white text-2xl font-bold">8</p>
                            <p className="text-white/40 text-xs">Friends</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 px-5 pb-4">
                <div className="space-y-2">
                    {[
                        { icon: "history", label: "Match History" },
                        { icon: "bookmark", label: "Saved Places", badge: "5" },
                        { icon: "payments", label: "Payment Methods" },
                        { icon: "notifications", label: "Notifications" },
                        { icon: "help", label: "Help & Support" },
                        { icon: "logout", label: "Log Out" },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className="w-full flex items-center gap-4 p-4 bg-[#2a1f1a] rounded-xl border border-white/5"
                        >
                            <span className="material-symbols-outlined text-white/50">{item.icon}</span>
                            <span className="flex-1 text-left text-white font-medium">{item.label}</span>
                            {item.badge && (
                                <span className="px-2 py-0.5 bg-[#f46a25] text-white text-xs font-bold rounded-full">{item.badge}</span>
                            )}
                            <span className="material-symbols-outlined text-white/20 text-lg">chevron_right</span>
                        </button>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
