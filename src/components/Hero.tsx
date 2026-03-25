"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import WavyBackground from "./WavyBackground";

const HeroVisual = dynamic(() => import("./HeroVisual"), { ssr: false });

export default function Hero() {
  const t = useTranslations("Hero");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(
          ".hero-word",
          { opacity: 0, y: 70, rotateX: 30 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.06,
          },
          "-=0.25"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.35"
        )
        .fromTo(
          ".hero-cta-row",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          ".hero-visual",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <WavyBackground
      className="min-h-[100dvh]"
      waveOpacity={0.25}
      blur={12}
      speed="slow"
      colors={["#c09cff", "#8f47ff", "#ff5dd7", "#00c1fd", "#6d28d9"]}
      backgroundFill="rgba(14,14,19,1)"
    >
      <section
        ref={sectionRef}
        className="relative min-h-[100dvh] flex items-center px-6 md:px-12 lg:px-20 pt-24 md:pt-0 overflow-hidden"
        style={{ perspective: "800px" }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: Text Content ── */}
          <div className="text-left">
            {/* Label */}
            <div className="hero-label inline-flex items-center gap-2.5 mb-8 opacity-0">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
              <span className="text-[11px] md:text-xs font-label uppercase tracking-[0.4em] text-primary/80">
                {t("label")}
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/60" />
            </div>

            {/* Headline */}
            <h1
              className="hero-heading text-3xl md:text-4xl lg:text-5xl font-headline font-bold tracking-[-0.03em] leading-[1.1] pb-1 text-on-background"
              style={{ perspective: "600px" }}
            >
              {t("line1")
                .split(" ")
                .map((word, i) => (
                  <span
                    key={i}
                    className="hero-word inline-block opacity-0 mr-[0.25em]"
                  >
                    {word}
                  </span>
                ))}
              <br />
              {t("line2pre")
                .split(" ")
                .map((word, i) => (
                  <span
                    key={`p${i}`}
                    className="hero-word inline-block opacity-0 mr-[0.25em]"
                  >
                    {word}
                  </span>
                ))}
              <span
                className="hero-word inline-block opacity-0 text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #c09cff 0%, #a855f7 35%, #ff5dd7 70%, #00c1fd 100%)",
                }}
              >
                {t("line2gradient")}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="hero-sub text-base md:text-lg text-on-surface-variant/80 max-w-lg mt-7 leading-relaxed opacity-0">
              {t("subheadline")}
            </p>

            {/* Social icons */}
            <div className="hero-sub flex items-center gap-4 mt-6 opacity-0">
              <a href="https://www.instagram.com/movika.ge/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] text-on-surface-variant"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577516274718" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] text-on-surface-variant"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/></svg>
              </a>
              <a href="https://wa.me/995557635623" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] text-on-surface-variant"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/></svg>
              </a>
            </div>

            {/* CTAs */}
            <div className="hero-cta-row flex flex-wrap items-center gap-3.5 mt-6 opacity-0">
              <a
                href="https://wa.me/995557635623"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-3.5 rounded-full kinetic-gradient text-on-primary-container font-bold text-sm hover:shadow-[0_0_50px_-8px_rgba(192,156,255,0.45)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                {t("cta")}
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </a>
              <a
                href="#portfolio"
                className="px-7 py-3.5 rounded-full text-on-surface-variant font-bold text-sm border border-outline-variant/20 hover:border-primary/30 hover:text-on-background transition-all duration-300 cursor-pointer"
              >
                {t("cta2")}
              </a>
            </div>
          </div>

          {/* ── Right: Video player ── */}
          <div
            className="hero-visual relative opacity-0"
            style={{ marginRight: "-6vw" }}
          >
            <HeroVisual />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-5 h-8 rounded-full border border-on-surface-variant/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-on-surface-variant/50 animate-bounce" />
          </div>
        </div>
      </section>
    </WavyBackground>
  );
}
