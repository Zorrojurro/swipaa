"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: "home", label: "Home", href: "/discover" },
    { icon: "search", label: "Search", href: "/search" },
    { icon: "add_circle", label: "Group", href: "/group", center: true },
    { icon: "bookmark", label: "Saved", href: "/saved" },
    { icon: "person", label: "Profile", href: "/profile" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="pb-safe">
            {/* Floating pill container */}
            <div className="mx-4 mb-4 px-2 py-2 rounded-[28px] bg-[#171211]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
                <div className="flex items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href === "/discover" && pathname === "/");

                        // Center button (Create Group) - special styling
                        if (item.center) {
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative -mt-6"
                                >
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#f46a25] to-[#d35a15] flex items-center justify-center shadow-lg shadow-[#f46a25]/40 active:scale-95 transition-transform">
                                        <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            add
                                        </span>
                                    </div>
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex flex-col items-center py-2 px-3 group"
                            >
                                {/* Active indicator pill */}
                                {isActive && (
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[#f46a25] shadow-sm shadow-[#f46a25]/50" />
                                )}

                                <span
                                    className={`material-symbols-outlined text-[26px] transition-all duration-200 ${isActive
                                            ? "text-white scale-110"
                                            : "text-white/40 group-hover:text-white/60"
                                        }`}
                                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                                >
                                    {item.icon}
                                </span>

                                <span className={`text-[10px] font-medium mt-0.5 transition-colors ${isActive ? "text-white/90" : "text-white/30"
                                    }`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
