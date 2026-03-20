"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "ka" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
    { href: "#blog", label: "Blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(138,63,252,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 pt-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0">
          <Image
            src="/movika_logo.png"
            alt="Movika"
            width={60}
            height={240}
            className="h-[25px] w-auto object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-background/70 hover:text-on-background transition-colors font-body"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5
                       text-sm font-medium text-on-surface-variant
                       bg-surface-container-high
                       border border-outline-variant/30
                       hover:bg-surface-bright
                       transition-all duration-200 cursor-pointer"
            aria-label="Switch language"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="opacity-60"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{locale === "en" ? "EN" : "GE"}</span>
          </button>

          {/* CTA */}
          <a href="https://wa.me/995557635623" target="_blank" rel="noopener noreferrer" className="bg-primary text-on-primary-container px-6 py-2.5 rounded-full font-bold hover:scale-105 hover:opacity-90 transition-all duration-300 active:scale-95 font-body">
            {t("cta")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center rounded-lg p-2
                     text-on-surface-variant hover:text-on-background
                     transition-colors duration-200 cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-outline-variant/20 bg-surface/95 backdrop-blur-xl px-6 pb-6 pt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-on-surface-variant hover:text-on-background transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/20">
            <button
              onClick={switchLocale}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5
                         text-sm font-medium text-on-surface-variant
                         bg-surface-container-high border border-outline-variant/30
                         transition-all duration-200 cursor-pointer"
              aria-label="Switch language"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{locale === "en" ? "EN" : "GE"}</span>
            </button>
          </div>

          <a href="https://wa.me/995557635623" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 rounded-full bg-primary text-on-primary-container font-bold transition-all font-body text-center block">
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
