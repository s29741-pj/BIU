"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
	{ href: "/", label: "Glowna" },
	{ href: "/filmy", label: "Filmy" },
];

export default function Nav() {
	const pathname = usePathname();

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
		</nav>
	);
}
