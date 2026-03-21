"use client";

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Montserrat";

// ── Fonts ─────────────────────────────────────────────────────
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "800", "900"],
  subsets: ["latin"],
});

// ── Brand ─────────────────────────────────────────────────────
const BG = "#080810";
const PRIMARY = "#c09cff";
const SECONDARY = "#00c1fd";
const TERTIARY = "#ff5dd7";
const ACCENT_GRAD = `linear-gradient(135deg, ${PRIMARY} 0%, #a855f7 40%, ${TERTIARY} 75%, ${SECONDARY} 100%)`;

// ── Helpers ───────────────────────────────────────────────────
function ci(
  frame: number,
  [f0, f1]: [number, number],
  [v0, v1]: [number, number],
  easing = Easing.out(Easing.cubic)
) {
  return interpolate(frame, [f0, f1], [v0, v1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

// ── Phone mockup ─────────────────────────────────────────────
function PhoneMockup({
  children,
  width = 220,
  rotate = 0,
  style = {},
}: {
  children: React.ReactNode;
  width?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  const h = Math.round(width * (16 / 9));
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: 28,
        border: "5px solid rgba(255,255,255,0.14)",
        background: "#000",
        overflow: "hidden",
        boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)`,
        transform: `rotate(${rotate}deg)`,
        position: "relative",
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 55,
          height: 7,
          borderRadius: 10,
          background: "rgba(0,0,0,0.9)",
          zIndex: 10,
        }}
      />
      {children}
    </div>
  );
}

// ── Diagonal accent slash ─────────────────────────────────────
function DiagSlash({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "44%",
        width: 2,
        background: `linear-gradient(to bottom, transparent 0%, ${PRIMARY}33 25%, ${PRIMARY}77 50%, ${PRIMARY}33 75%, transparent 100%)`,
        transform: "skewX(-8deg)",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 1 — "MEET MOVIKA" — Punch-in intro, 1280×720
// ══════════════════════════════════════════════════════════════
function SceneMeetMovika() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "MEET" slides from left with punch scale
  const meetSpring = spring({ frame, fps, config: { damping: 14, stiffness: 260 } });
  const meetX = interpolate(meetSpring, [0, 1], [-200, 0]);
  const meetScale = interpolate(meetSpring, [0, 1], [1.25, 1]);
  const meetOp = interpolate(meetSpring, [0, 0.25], [0, 1], { extrapolateRight: "clamp" });

  // "MOVIKA" slightly delayed
  const movikaSpring = spring({ frame: frame - Math.round(0.12 * fps), fps, config: { damping: 14, stiffness: 260 } });
  const movikaX = interpolate(movikaSpring, [0, 1], [-200, 0]);
  const movikaScale = interpolate(movikaSpring, [0, 1], [1.3, 1]);
  const movikaOp = interpolate(movikaSpring, [0, 0.25], [0, 1], { extrapolateRight: "clamp" });

  const taglineOp = ci(frame, [Math.round(1.0 * fps), Math.round(1.5 * fps)], [0, 1]);
  const taglineY = ci(frame, [Math.round(1.0 * fps), Math.round(1.5 * fps)], [20, 0]);

  // Phone slides in from right
  const phoneSpring = spring({ frame: frame - Math.round(0.25 * fps), fps, config: { damping: 200 } });
  const phoneX = interpolate(phoneSpring, [0, 1], [280, 0]);
  const phoneOp = interpolate(phoneSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  const services = ["Reels", "Posts", "Editing", "Stories"];

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "-15%", left: "-5%", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${PRIMARY}0f 0%, transparent 65%)`, filter: "blur(90px)" }} />
      <div style={{ position: "absolute", bottom: "-20%", right: "15%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${SECONDARY}0a 0%, transparent 65%)`, filter: "blur(70px)" }} />

      {/* Left: big punch-in text block */}
      <div style={{ position: "absolute", left: 90, top: "50%", transform: "translateY(-52%)" }}>
        <div style={{
          fontFamily, fontSize: 130, fontWeight: 900, letterSpacing: "-0.055em",
          lineHeight: 0.86, color: "#ede8ff", textTransform: "uppercase" as const,
          opacity: meetOp, transform: `translateX(${meetX}px) scale(${meetScale})`,
          transformOrigin: "left center",
        }}>
          MEET
        </div>
        <div style={{
          fontFamily, fontSize: 130, fontWeight: 900, letterSpacing: "-0.055em",
          lineHeight: 0.86, textTransform: "uppercase" as const,
          background: ACCENT_GRAD, WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", backgroundClip: "text",
          opacity: movikaOp, transform: `translateX(${movikaX}px) scale(${movikaScale})`,
          transformOrigin: "left center",
        }}>
          MOVIKA
        </div>

        {/* Tagline */}
        <div style={{
          marginTop: 24, opacity: taglineOp, transform: `translateY(${taglineY}px)`,
          fontFamily, fontSize: 15, fontWeight: 700, letterSpacing: "0.2em",
          color: `${PRIMARY}88`, textTransform: "uppercase" as const,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 28, height: 2, background: `${PRIMARY}55` }} />
          Social Media Agency · Real Estate
        </div>

        {/* Service pills */}
        <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" as const }}>
          {services.map((s, i) => {
            const sOp = ci(frame, [Math.round((1.5 + i * 0.1) * fps), Math.round((1.85 + i * 0.1) * fps)], [0, 1]);
            const sY = ci(frame, [Math.round((1.5 + i * 0.1) * fps), Math.round((1.85 + i * 0.1) * fps)], [10, 0]);
            return (
              <span key={s} style={{
                fontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
                textTransform: "uppercase" as const, color: `${PRIMARY}cc`,
                background: `${PRIMARY}12`, border: `1px solid ${PRIMARY}28`,
                borderRadius: 100, padding: "5px 14px",
                opacity: sOp, transform: `translateY(${sY}px)`,
              }}>{s}</span>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <DiagSlash opacity={ci(frame, [Math.round(0.7 * fps), Math.round(1.1 * fps)], [0, 1])} />

      {/* Right: phone with poster */}
      <div style={{
        position: "absolute", right: 120, top: "50%",
        transform: `translateY(-50%) translateX(${phoneX}px)`,
        opacity: phoneOp,
      }}>
        <PhoneMockup width={260} rotate={-6}>
          <Img
            src={staticFile("movika_posters-01.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </PhoneMockup>
      </div>

      {/* Logo top-left */}
      <div style={{
        position: "absolute", top: 32, left: 40,
        opacity: ci(frame, [Math.round(1.5 * fps), Math.round(2 * fps)], [0, 1]),
      }}>
        <Img src={staticFile("movika_logo.png")} style={{ width: 88 }} />
      </div>
    </AbsoluteFill>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 2 — "PROPERTY REELS" — Left text + right phone video
// ══════════════════════════════════════════════════════════════
function ScenePropertyReels() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "PROPERTY" punches from left
  const s1 = spring({ frame, fps, config: { damping: 14, stiffness: 260 } });
  const t1X = interpolate(s1, [0, 1], [-200, 0]);
  const t1Scale = interpolate(s1, [0, 1], [1.25, 1]);
  const t1Op = interpolate(s1, [0, 0.25], [0, 1], { extrapolateRight: "clamp" });

  // "REELS" slightly delayed
  const s2 = spring({ frame: frame - Math.round(0.1 * fps), fps, config: { damping: 14, stiffness: 260 } });
  const t2X = interpolate(s2, [0, 1], [-200, 0]);
  const t2Scale = interpolate(s2, [0, 1], [1.25, 1]);
  const t2Op = interpolate(s2, [0, 0.25], [0, 1], { extrapolateRight: "clamp" });

  const subOp = ci(frame, [Math.round(0.8 * fps), Math.round(1.2 * fps)], [0, 1]);
  const subY = ci(frame, [Math.round(0.8 * fps), Math.round(1.2 * fps)], [16, 0]);

  // Right: phone slides in
  const phoneSpring = spring({ frame, fps, config: { damping: 200 } });
  const phoneX = interpolate(phoneSpring, [0, 1], [200, 0]);
  const phoneOp = interpolate(phoneSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "15%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${TERTIARY}0c 0%, transparent 70%)`, filter: "blur(90px)" }} />

      {/* Left: big text */}
      <div style={{ position: "absolute", left: 90, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{
          fontFamily, fontSize: 140, fontWeight: 900, letterSpacing: "-0.055em",
          lineHeight: 0.82, textTransform: "uppercase" as const, color: "#ede8ff",
          opacity: t1Op, transform: `translateX(${t1X}px) scale(${t1Scale})`,
          transformOrigin: "left center",
        }}>
          PROPERTY
        </div>
        <div style={{
          fontFamily, fontSize: 140, fontWeight: 900, letterSpacing: "-0.055em",
          lineHeight: 0.82, textTransform: "uppercase" as const,
          background: `linear-gradient(135deg, ${TERTIARY} 0%, ${PRIMARY} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          opacity: t2Op, transform: `translateX(${t2X}px) scale(${t2Scale})`,
          transformOrigin: "left center",
        }}>
          REELS
        </div>

        {/* Platform list */}
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column" as const, gap: 10, opacity: subOp, transform: `translateY(${subY}px)` }}>
          {["Instagram Reels", "TikTok Videos", "Facebook Clips"].map((tag) => (
            <div key={tag} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontFamily, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
              color: `${TERTIARY}aa`, textTransform: "uppercase" as const,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: TERTIARY }} />
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <DiagSlash opacity={ci(frame, [0, Math.round(0.4 * fps)], [0, 1])} />

      {/* Right: phone with video */}
      <div style={{
        position: "absolute", right: 110, top: "50%",
        transform: `translateY(-50%) translateX(${phoneX}px)`,
        opacity: phoneOp,
      }}>
        <PhoneMockup width={270} rotate={5}>
          <Video
            src={staticFile("videos/1.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            loop
          />
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 3 — Poster showcase — "SOCIAL MEDIA CONTENT"
// ══════════════════════════════════════════════════════════════
function ScenePosterGrid() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const posters = [
    { src: "movika_posters-01.png", rotate: -7, delay: 0, drift: 0 },
    { src: "movika_posters-03.png", rotate: 3, delay: 0.07, drift: -24 },
    { src: "movika_posters-01.png", rotate: 8, delay: 0.14, drift: 12 },
  ];

  const titleY = ci(frame, [0, Math.round(0.45 * fps)], [-70, 0]);
  const titleOp = ci(frame, [0, Math.round(0.4 * fps)], [0, 1]);
  const subOp = ci(frame, [Math.round(1.0 * fps), Math.round(1.4 * fps)], [0, 1]);

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 900, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${PRIMARY}0c 0%, transparent 70%)`, filter: "blur(100px)", transform: "translate(-50%,-50%)" }} />

      {/* Top headline */}
      <div style={{
        position: "absolute", top: 56, left: 0, right: 0, textAlign: "center",
        opacity: titleOp, transform: `translateY(${titleY}px)`,
      }}>
        <span style={{ fontFamily, fontSize: 84, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.85, color: "#ede8ff", textTransform: "uppercase" as const }}>
          SOCIAL MEDIA{" "}
        </span>
        <span style={{ fontFamily, fontSize: 84, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.85, textTransform: "uppercase" as const, background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          CONTENT
        </span>
      </div>

      {/* Poster row */}
      <div style={{ display: "flex", gap: 36, alignItems: "flex-end", justifyContent: "center", marginTop: 50 }}>
        {posters.map(({ src, rotate, delay, drift }, i) => {
          const s = spring({ frame: frame - Math.round(delay * fps), fps, config: { damping: 200 } });
          const itemY = interpolate(s, [0, 1], [130, drift]);
          const itemOp = interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
          const itemScale = interpolate(s, [0, 1], [0.82, 1]);
          return (
            <div key={i} style={{
              transform: `translateY(${itemY}px) rotate(${rotate}deg) scale(${itemScale})`,
              opacity: itemOp, width: 240, height: 370, borderRadius: 20, overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.1)",
              boxShadow: "0 28px 70px rgba(0,0,0,0.65)",
            }}>
              <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          );
        })}
      </div>

      {/* Bottom tag */}
      <div style={{
        position: "absolute", bottom: 46, left: 0, right: 0, textAlign: "center",
        opacity: subOp, fontFamily, fontSize: 13, fontWeight: 700,
        letterSpacing: "0.24em", color: `${PRIMARY}77`, textTransform: "uppercase" as const,
      }}>
        Property listings that convert
      </div>
    </AbsoluteFill>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 4 — VIDEO EDITING — Full-bleed bg + left text
// ══════════════════════════════════════════════════════════════
function SceneVideoEditing() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgSpring = spring({ frame, fps, config: { damping: 200 } });
  const bgScale = interpolate(bgSpring, [0, 1], [1.07, 1]);
  const bgOp = interpolate(bgSpring, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  // "VIDEO" punches up from bottom
  const s1 = spring({ frame: frame - Math.round(0.4 * fps), fps, config: { damping: 14, stiffness: 260 } });
  const t1Y = interpolate(s1, [0, 1], [140, 0]);
  const t1Scale = interpolate(s1, [0, 1], [1.2, 1]);
  const t1Op = interpolate(s1, [0, 0.25], [0, 1], { extrapolateRight: "clamp" });

  // "EDITING" slightly after
  const s2 = spring({ frame: frame - Math.round(0.52 * fps), fps, config: { damping: 14, stiffness: 260 } });
  const t2Y = interpolate(s2, [0, 1], [140, 0]);
  const t2Scale = interpolate(s2, [0, 1], [1.2, 1]);
  const t2Op = interpolate(s2, [0, 0.25], [0, 1], { extrapolateRight: "clamp" });

  const specOp = ci(frame, [Math.round(1.1 * fps), Math.round(1.5 * fps)], [0, 1]);
  const specY = ci(frame, [Math.round(1.1 * fps), Math.round(1.5 * fps)], [14, 0]);

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      {/* Full-bleed video BG */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${bgScale})`, opacity: bgOp }}>
        <Video
          src={staticFile("videos/2.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted
          loop
        />
      </div>

      {/* Dark gradient overlay — stronger on left */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to right, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.75) 40%, rgba(8,8,16,0.15) 100%)`,
      }} />

      {/* Cinematic letterbox bars */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 42, background: "#080810" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 42, background: "#080810" }} />

      {/* Left: text */}
      <div style={{ position: "absolute", left: 90, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{
          fontFamily, fontSize: 140, fontWeight: 900, letterSpacing: "-0.055em",
          lineHeight: 0.82, textTransform: "uppercase" as const, color: "#ede8ff",
          opacity: t1Op, transform: `translateY(${t1Y}px) scale(${t1Scale})`,
          transformOrigin: "left center",
        }}>
          VIDEO
        </div>
        <div style={{
          fontFamily, fontSize: 140, fontWeight: 900, letterSpacing: "-0.055em",
          lineHeight: 0.82, textTransform: "uppercase" as const,
          background: `linear-gradient(135deg, ${SECONDARY} 0%, ${PRIMARY} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          opacity: t2Op, transform: `translateY(${t2Y}px) scale(${t2Scale})`,
          transformOrigin: "left center",
        }}>
          EDITING
        </div>

        {/* Specs */}
        <div style={{ marginTop: 24, display: "flex", gap: 24, opacity: specOp, transform: `translateY(${specY}px)` }}>
          {["4K Quality", "Color Grade", "48h Delivery"].map((spec) => (
            <div key={spec} style={{
              display: "flex", alignItems: "center", gap: 7,
              fontFamily, fontSize: 13, fontWeight: 700,
              color: `${SECONDARY}bb`, letterSpacing: "0.1em", textTransform: "uppercase" as const,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: SECONDARY }} />
              {spec}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ══════════════════════════════════════════════════════════════
// SCENE 5 — End card
// ══════════════════════════════════════════════════════════════
function SceneEnd() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 200 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.72, 1]);
  const logoOp = interpolate(logoSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const taglineOp = ci(frame, [Math.round(0.5 * fps), Math.round(0.9 * fps)], [0, 1]);
  const taglineY = ci(frame, [Math.round(0.5 * fps), Math.round(0.9 * fps)], [30, 0]);
  const subOp = ci(frame, [Math.round(0.9 * fps), Math.round(1.3 * fps)], [0, 1]);
  const pillOp = ci(frame, [Math.round(1.2 * fps), Math.round(1.6 * fps)], [0, 1]);
  const pillY = ci(frame, [Math.round(1.2 * fps), Math.round(1.6 * fps)], [14, 0]);

  const pulse = 1 + Math.sin((frame * Math.PI) / (1.5 * fps)) * 0.012;

  return (
    <AbsoluteFill
      style={{
        background: BG, alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 20, overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 900, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${PRIMARY}12 0%, transparent 65%)`, filter: "blur(110px)", transform: "translate(-50%,-50%)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "20%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${SECONDARY}0e 0%, transparent 70%)`, filter: "blur(60px)" }} />

      <Img
        src={staticFile("movika_logo_original.png")}
        style={{
          width: 160, opacity: logoOp,
          transform: `scale(${logoScale * pulse})`,
          filter: `drop-shadow(0 0 34px ${PRIMARY}60)`,
          position: "relative", zIndex: 2,
        }}
      />

      <div style={{
        opacity: taglineOp, transform: `translateY(${taglineY}px)`,
        fontFamily, fontSize: 64, fontWeight: 900, letterSpacing: "-0.045em",
        textAlign: "center", lineHeight: 1, color: "#ede8ff",
        position: "relative", zIndex: 2,
      }}>
        Content that{" "}
        <span style={{ background: ACCENT_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          sells.
        </span>
      </div>

      <div style={{
        opacity: subOp, fontFamily, fontSize: 14, fontWeight: 700,
        color: "#f9f5fd44", letterSpacing: "0.08em", textAlign: "center",
        position: "relative", zIndex: 2,
      }}>
        Real estate agents · Georgia
      </div>

      <div style={{
        opacity: pillOp, transform: `translateY(${pillY}px)`,
        background: `linear-gradient(135deg, ${PRIMARY}1a, ${SECONDARY}12)`,
        border: `1px solid ${PRIMARY}35`, borderRadius: 100,
        padding: "11px 28px", display: "flex", alignItems: "center", gap: 10,
        position: "relative", zIndex: 2,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: PRIMARY, boxShadow: `0 0 10px ${PRIMARY}` }} />
        <span style={{ fontFamily, fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color: `${PRIMARY}ee`, textTransform: "uppercase" as const }}>
          From 79₾ · First 3 Reels Free
        </span>
      </div>
    </AbsoluteFill>
  );
}

// ══════════════════════════════════════════════════════════════
// ROOT COMPOSITION — 1280 × 720 (16:9 HD)
// ══════════════════════════════════════════════════════════════
export const HERO_FPS = 30;

const SCENE_DUR = {
  meet: 3.5,
  reels: 3.5,
  grid: 3.5,
  editing: 3.5,
  end: 3.0,
};
const FADE_S = 0.4;
const N_TRANSITIONS = 4;

export const HERO_DURATION = Math.round(
  (SCENE_DUR.meet + SCENE_DUR.reels + SCENE_DUR.grid + SCENE_DUR.editing + SCENE_DUR.end - FADE_S * N_TRANSITIONS) * HERO_FPS
); // ≈ 468f ≈ 15.6s

const FADE_TIMING = linearTiming({ durationInFrames: Math.round(FADE_S * HERO_FPS) });

export default function HeroComposition() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={Math.round(SCENE_DUR.meet * fps)} premountFor={Math.round(fps)}>
          <SceneMeetMovika />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={FADE_TIMING} />

        <TransitionSeries.Sequence durationInFrames={Math.round(SCENE_DUR.reels * fps)} premountFor={Math.round(fps)}>
          <ScenePropertyReels />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={FADE_TIMING} />

        <TransitionSeries.Sequence durationInFrames={Math.round(SCENE_DUR.grid * fps)} premountFor={Math.round(fps)}>
          <ScenePosterGrid />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={FADE_TIMING} />

        <TransitionSeries.Sequence durationInFrames={Math.round(SCENE_DUR.editing * fps)} premountFor={Math.round(fps)}>
          <SceneVideoEditing />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={FADE_TIMING} />

        <TransitionSeries.Sequence durationInFrames={Math.round(SCENE_DUR.end * fps)} premountFor={Math.round(fps)}>
          <SceneEnd />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
}
