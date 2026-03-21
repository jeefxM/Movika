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
        className="relative min-h-[100dvh] flex items-center px-6 md:px-12 lg:px-20 overflow-hidden"
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
              className="hero-heading text-[clamp(2.4rem,6vw,5.5rem)] font-headline font-bold tracking-[-0.03em] leading-[0.92] text-on-background"
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
              <br className="hidden sm:block" />
              {t("line2pre")
                .split(" ")
                .map((word, i) => (
                  <span
                    key={`p${i}`}
                    className="hero-word inline-block opacity-0 mr-[0.25em]"
                  >
                    {word}
                  </span>
                ))}{" "}
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

            {/* CTAs */}
            <div className="hero-cta-row flex flex-wrap items-center gap-3.5 mt-9 opacity-0">
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
