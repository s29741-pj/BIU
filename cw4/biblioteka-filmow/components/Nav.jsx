"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFilmState } from "@/context/FilmContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
    { href: "/", label: "Glowna" },
    { href: "/filmy", label: "Filmy" },
];

export default function Nav() {
    const pathname = usePathname();
    const state = useFilmState();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            {navLinks.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={pathname === href ? "active" : ""}>
                    {label}
                </Link>
            ))}
            <span>Ulubione: {state.favorites.length}</span>
            <button onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Ciemny' : '☀️ Jasny'}
            </button>
        </nav>
    );
}