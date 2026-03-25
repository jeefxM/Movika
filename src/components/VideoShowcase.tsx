"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

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

function ReelCard({ src, onOpen, index }: { src: string; onOpen: () => void; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (v) { v.currentTime = 0.3; v.play().catch(() => {}); }
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0.3; }
  };

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden aspect-[9/16] cursor-pointer group"
      style={{
        border: "1px solid rgba(255,255,255,0.04)",
        boxShadow: "0 8px 32px -8px rgba(0,0,0,0.4)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onClick={onOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={`${src}#t=0.3`}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        loop
      />

      {/* Play icon — fades out on hover when video plays */}
      <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <Play size={18} className="text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,193,253,0.15), 0 0 20px -4px rgba(0,193,253,0.1)" }}
      />
    </motion.div>
  );
}

function DesignCard({ src, onOpen, index }: { src: string; onOpen: () => void; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden aspect-[9/16] cursor-pointer group"
      style={{
        border: "1px solid rgba(255,255,255,0.04)",
        boxShadow: "0 8px 32px -8px rgba(0,0,0,0.4)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onClick={onOpen}
    >
      <img
        src={src}
        alt="Property listing design by Movika"
        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,93,215,0.15), 0 0 20px -4px rgba(255,93,215,0.1)" }}
      />
    </motion.div>
  );
}

export default function VideoShowcase() {
  const t = useTranslations("VideoShowcase");
  const [lightbox, setLightbox] = useState<{ type: "image" | "video"; src: string } | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeLightbox]);

  return (
    <>
      <section className="py-28 px-6 md:px-8 overflow-hidden bg-surface-container-low" id="portfolio">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-[11px] font-label text-primary uppercase tracking-[0.3em]">
                {t("label")}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-on-background">
              {t("title")}
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg mt-4 max-w-md leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Reels */}
          <div className="mb-16">
            <motion.h3
              className="text-sm font-label text-secondary uppercase tracking-[0.2em] mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {t("reelsLabel")}
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {reels.map((item, i) => (
                <ReelCard
                  key={item.src}
                  src={item.src}
                  index={i}
                  onOpen={() => openLightbox("video", item.src)}
                />
              ))}
            </div>
          </div>

          {/* Designs */}
          <div>
            <motion.h3
              className="text-sm font-label text-tertiary uppercase tracking-[0.2em] mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {t("designsLabel")}
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {designs.map((item, i) => (
                <DesignCard
                  key={item.src}
                  src={item.src}
                  index={i}
                  onOpen={() => openLightbox("image", item.src)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox — portaled to body */}
      {mounted && createPortal(
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <X size={18} className="text-white" />
              </button>

              <motion.div
                className="relative max-h-[90vh] max-w-[90vw] md:max-w-[420px] rounded-2xl overflow-hidden"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {lightbox.type === "image" ? (
                  <img
                    src={lightbox.src}
                    alt="Design preview"
                    className="w-full h-auto max-h-[90vh] object-contain"
                  />
                ) : (
                  <video
                    ref={lightboxVideoRef}
                    src={lightbox.src}
                    className="w-full h-auto max-h-[90vh] object-contain"
                    controls
                    autoPlay
                    loop
                    playsInline
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
