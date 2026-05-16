"use client";

import Icon from "./icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};
const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <nav className="w-full top-0 sticky flex justify-between items-center px-6 md:px-12 py-5 max-w-full mx-auto z-50 bg-white border-b border-surface-container-high shadow-sm transition-all duration-300">
        <Link
          className="font-headline-sm text-headline-sm font-bold text-charred-wood flex items-center gap-2"
          href="/"
        >
          <Icon name="foundation" className="text-primary text-3xl" />
          <span className="tracking-tight">Terra Lodge</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              aria-current={
                pathname === link.href ||
                (link.href === "/rooms" &&
                  (pathname.startsWith("/room") ||
                    pathname.startsWith("/checkout")))
                  ? "page"
                  : undefined
              }
              className={`font-label-caps uppercase hover:text-primary transition-colors border-b-2 pb-1 ${
                pathname === link.href ||
                (link.href === "/rooms" &&
                  (pathname.startsWith("/room") ||
                    pathname.startsWith("/checkout")))
                  ? "text-charred-wood border-primary font-bold"
                  : "text-on-surface-variant border-transparent font-semibold"
              }`}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            className="hidden lg:flex items-center gap-1 font-body-md font-bold text-primary"
            href="tel:+233241234567"
          >
            <Icon name="call" className="text-sm" />
            <span>+233 24 123 4567</span>
          </a>
          <Link
            className="bg-primary text-white px-6 py-3 font-label-caps text-xs font-bold uppercase transition-all hover:bg-laterite-red shadow-md"
            href="/contact"
          >
            Book a Room
          </Link>
        </div>
      </nav>
    </header>
  );
};
