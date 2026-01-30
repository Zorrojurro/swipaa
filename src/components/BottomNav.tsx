"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    icon: string;
    label: string;
    href: string;
    filled?: boolean;
}

const navItems: NavItem[] = [
    { icon: "home", label: "Home", href: "/discover", filled: true },
    { icon: "search", label: "Search", href: "/search" },
    { icon: "group", label: "Groups", href: "/group" },
    { icon: "person", label: "Profile", href: "/profile" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="shrink-0 bg-[#1c1410] border-t border-white/5 px-6 pb-6 pt-3 flex justify-between items-center z-20">
            {navItems.map((item) => {
                const isActive = pathname === item.href ||
                    (item.href === "/discover" && pathname === "/");

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 group w-16 transition-colors ${isActive ? "text-[#f46a25]" : "text-white/40 hover:text-white"
                            }`}
                    >
                        <span
                            className="material-symbols-outlined text-[26px] group-hover:-translate-y-1 transition-transform"
                            style={{
                                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"
                            }}
                        >
                            {item.icon}
                        </span>
                        {isActive && (
                            <span className="w-1 h-1 rounded-full bg-[#f46a25]" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
