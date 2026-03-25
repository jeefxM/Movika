"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import VideoShowcase from "@/components/VideoShowcase";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    const sections = mainRef.current.querySelectorAll<HTMLElement>(".scroll-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-background text-on-background font-body overflow-x-clip selection:bg-primary selection:text-on-primary">
      <Navbar />

      <main ref={mainRef}>
        <Hero />
        <div className="scroll-section"><VideoShowcase /></div>
        <div className="scroll-section"><Services /></div>
        {/* <div className="scroll-section"><HowItWorks /></div> */}
        {/* <div className="scroll-section"><Testimonials /></div> */}
        <div className="scroll-section"><Pricing /></div>
        {/* <div className="scroll-section"><Blog /></div> */}
        <div className="scroll-section"><FAQ /></div>
      </main>

      <Footer />
    </div>
  );
}
