"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: "home", label: "Home", href: "/discover" },
    { icon: "search", label: "Search", href: "/search" },
    { icon: "group", label: "Groups", href: "/group" },
    { icon: "person", label: "Profile", href: "/profile" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="shrink-0 bg-[#1a120d] border-t border-white/5 px-6 pt-2 pb-8">
            <div className="flex justify-between items-center max-w-sm mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href === "/discover" && pathname === "/");

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center gap-1 py-2 px-4"
                        >
                            <span
                                className={`material-symbols-outlined text-2xl transition-colors ${isActive ? "text-[#f46a25]" : "text-white/40"
                                    }`}
                                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                            >
                                {item.icon}
                            </span>
                            <span className={`text-[10px] font-medium ${isActive ? "text-[#f46a25]" : "text-white/40"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
