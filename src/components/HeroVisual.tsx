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

      {/* Video wrapper */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "16/9",
          boxShadow:
            "0 0 0 1px rgba(192,156,255,0.07), 0 32px 80px -16px rgba(0,0,0,0.55), 0 0 60px -20px rgba(143,71,255,0.2)",
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
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
