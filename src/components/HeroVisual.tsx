"use client";

import Image from "next/image";

export default function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center h-full">
      <Image
        src="/hero-agent.png"
        alt="Real estate agent browsing property listings on phone"
        width={480}
        height={600}
        className="object-contain drop-shadow-[0_0_40px_rgba(143,71,255,0.25)]"
        priority
      />
    </div>
  );
}
