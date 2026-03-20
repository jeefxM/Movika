"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

const reels = [
  { src: "/videos/1.mp4" },
  { src: "/videos/2.mp4" },
  { src: "/videos/3.mp4" },
];

const designs = [
  { src: "/movika_posters-01.png" },
  { src: "/movika_posters-02.png" },
  { src: "/movika_posters-03.png" },
];

function getVisiblePair(current: number, total: number) {
  const next = (current + 1) % total;
  return [current, next];
}

function ReelCard({
  src,
  onOpen,
}: {
  src: string;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0.3;
    v.pause();
    setPlaying(false);
  }, [src]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play();
      setPlaying(true);
    }
  };

  return (
    <div
      className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[9/16] border border-white/[0.06] shadow-xl hover:shadow-2xl hover:border-secondary/15 transition-all duration-500 cursor-pointer"
      onClick={onOpen}
    >
      <video
        ref={videoRef}
        src={`${src}#t=0.3`}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
        <button onClick={handlePlay} className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center hover:bg-black/60 hover:scale-105 transition-all cursor-pointer">
          <Play size={22} className="text-white fill-white ml-0.5" />
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}

function ReelCarousel({ onOpen }: { onOpen: (src: string) => void }) {
  const [current, setCurrent] = useState(0);
  const pair = getVisiblePair(current, reels.length);

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : reels.length - 1));
  const next = () => setCurrent((c) => (c < reels.length - 1 ? c + 1 : 0));

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <button onClick={prev} className="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center hover:bg-surface-bright transition-colors cursor-pointer flex-shrink-0">
        <ChevronLeft size={22} className="text-on-surface-variant" />
      </button>

      <div className="w-full max-w-[640px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="grid grid-cols-2 gap-3 md:gap-4"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
          >
            {pair.map((idx) => (
              <ReelCard key={idx} src={reels[idx].src} onOpen={() => onOpen(reels[idx].src)} />
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-4">
          {reels.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? "bg-secondary w-6" : "bg-outline-variant/30"}`} />
          ))}
        </div>
      </div>

      <button onClick={next} className="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center hover:bg-surface-bright transition-colors cursor-pointer flex-shrink-0">
        <ChevronRight size={22} className="text-on-surface-variant" />
      </button>
    </div>
  );
}

function DesignCarousel({ onOpen }: { onOpen: (src: string) => void }) {
  const [current, setCurrent] = useState(0);
  const pair = getVisiblePair(current, designs.length);

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : designs.length - 1));
  const next = () => setCurrent((c) => (c < designs.length - 1 ? c + 1 : 0));

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <button onClick={prev} className="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center hover:bg-surface-bright transition-colors cursor-pointer flex-shrink-0">
        <ChevronLeft size={22} className="text-on-surface-variant" />
      </button>

      <div className="w-full max-w-[640px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="grid grid-cols-2 gap-3 md:gap-4"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
          >
            {pair.map((idx) => (
              <div key={idx} className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[9/16] border border-white/[0.06] shadow-xl hover:shadow-2xl hover:border-tertiary/15 transition-all duration-500 cursor-pointer group" onClick={() => onOpen(designs[idx].src)}>
                <img src={designs[idx].src} alt="Social media design" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-4">
          {designs.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? "bg-tertiary w-6" : "bg-outline-variant/30"}`} />
          ))}
        </div>
      </div>

      <button onClick={next} className="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center hover:bg-surface-bright transition-colors cursor-pointer flex-shrink-0">
        <ChevronRight size={22} className="text-on-surface-variant" />
      </button>
    </div>
  );
}

export default function VideoShowcase() {
  const t = useTranslations("VideoShowcase");
  const [lightbox, setLightbox] = useState<{ type: "image" | "video"; src: string } | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  const openLightbox = useCallback((type: "image" | "video", src: string) => {
    setLightbox({ type, src });
    if (type === "video") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (lightboxVideoRef.current) {
            lightboxVideoRef.current.muted = false;
            lightboxVideoRef.current.currentTime = 0;
            lightboxVideoRef.current.play();
          }
        });
      });
    }
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeLightbox]);

  return (
    <>
      <section className="py-28 px-6 md:px-8 overflow-hidden bg-surface-container-low" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16 md:mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/60" />
              <span className="text-[11px] font-label text-primary uppercase tracking-[0.3em]">{t("label")}</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/60" />
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-on-background">{t("title")}</h2>
            <p className="text-on-surface-variant text-base md:text-lg mt-4 max-w-md mx-auto leading-relaxed">{t("subtitle")}</p>
          </motion.div>

          <div className="mb-20">
            <motion.h3 className="text-sm font-label text-secondary uppercase tracking-[0.2em] mb-8 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {t("reelsLabel")}
            </motion.h3>
            <ReelCarousel onOpen={(src) => openLightbox("video", src)} />
          </div>

          <div>
            <motion.h3 className="text-sm font-label text-tertiary uppercase tracking-[0.2em] mb-8 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {t("designsLabel")}
            </motion.h3>
            <DesignCarousel onOpen={(src) => openLightbox("image", src)} />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer z-10">
              <X size={20} className="text-white" />
            </button>
            <motion.div
              className="relative max-h-[90vh] max-w-[90vw] md:max-w-[420px] rounded-3xl overflow-hidden"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === "image" ? (
                <img src={lightbox.src} alt="Design preview" className="w-full h-auto max-h-[90vh] object-contain" />
              ) : (
                <video ref={lightboxVideoRef} src={lightbox.src} className="w-full h-auto max-h-[90vh] object-contain" controls autoPlay loop playsInline />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
