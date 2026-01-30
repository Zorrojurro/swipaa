"use client";

import BottomNav from "@/components/BottomNav";
import { mockGroupMembers } from "@/data/restaurants";

export default function ProfilePage() {
    const user = mockGroupMembers[0];

    const stats = [
        { label: "Matches", value: 12, icon: "favorite" },
        { label: "Groups", value: 3, icon: "group" },
        { label: "Friends", value: 8, icon: "person" },
    ];

    return (
        <div className="flex flex-col min-h-dvh">
            {/* Header */}
            <div className="pt-12 px-6 pb-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-white text-2xl font-bold">Profile</h1>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/60">settings</span>
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-[#2a221e] rounded-2xl p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#f46a25]/20 mx-auto mb-4 flex items-center justify-center text-4xl border-2 border-[#f46a25]">
                        {user.avatar}
                    </div>
                    <h2 className="text-white text-xl font-bold mb-1">{user.name}</h2>
                    <p className="text-white/40 text-sm mb-4">Bengaluru Foodie</p>

                    {/* Stats */}
                    <div className="flex justify-center gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-white text-2xl font-bold">{stat.value}</p>
                                <p className="text-white/40 text-xs">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-6 pb-24">
                <div className="space-y-2">
                    {[
                        { icon: "history", label: "Match History", badge: null },
                        { icon: "bookmark", label: "Saved Restaurants", badge: "5" },
                        { icon: "payments", label: "Payment Methods", badge: null },
                        { icon: "notifications", label: "Notifications", badge: "2" },
                        { icon: "help", label: "Help & Support", badge: null },
                        { icon: "logout", label: "Log Out", badge: null },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className="w-full flex items-center gap-4 p-4 bg-[#2a221e] rounded-xl hover:bg-white/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-white/60 text-[24px]">{item.icon}</span>
                            <span className="flex-1 text-left text-white font-medium">{item.label}</span>
                            {item.badge && (
                                <span className="px-2 py-0.5 bg-[#f46a25] text-white text-xs font-bold rounded-full">
                                    {item.badge}
                                </span>
                            )}
                            <span className="material-symbols-outlined text-white/30 text-[20px]">chevron_right</span>
                        </button>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
