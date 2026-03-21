"use client";

import { Player } from "@remotion/player";
import HeroComposition, {
  HERO_DURATION,
  HERO_FPS,
} from "@/remotion/HeroComposition";

export default function HeroVisual() {
  return (
    <div className="relative w-full">
      {/* Ambient glow behind player */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,156,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Player wrapper */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "16/9",
          boxShadow:
            "0 0 0 1px rgba(192,156,255,0.07), 0 32px 80px -16px rgba(0,0,0,0.55), 0 0 60px -20px rgba(143,71,255,0.2)",
        }}
      >
        <Player
          component={HeroComposition}
          durationInFrames={HERO_DURATION}
          fps={HERO_FPS}
          compositionWidth={1280}
          compositionHeight={720}
          style={{ width: "100%", height: "100%", display: "block" }}
          autoPlay
          loop
          controls={false}
          acknowledgeRemotionLicense
        />
      </div>

      {/* Bottom corner accent glow */}
      <div
        className="absolute -bottom-6 -right-8 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,193,253,0.1) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  );
}
