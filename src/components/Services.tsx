"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Film, Play, Palette } from "lucide-react";

export default function Services() {
  const t = useTranslations("Services");

  return (
    <section className="py-28 px-6 md:px-8 relative overflow-hidden" id="services">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-background">
            {t("title")}
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg mt-4 max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Bento — 3 services */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* ── Video Editing — large ── */}
          <motion.div
            className="md:col-span-7 group relative rounded-[1.75rem] p-8 md:p-10 min-h-[420px] flex flex-col justify-between overflow-hidden cursor-pointer border border-white/[0.05] hover:border-secondary/25 transition-all duration-500"
            style={{
              background:
                "linear-gradient(170deg, rgba(20,28,38,0.95) 0%, rgba(12,16,24,0.98) 100%)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
              <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-secondary/25 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-5%] left-[5%] w-[40%] h-[40%] bg-primary/12 rounded-full blur-[70px]" />
            </div>

            {/* Timeline visual */}
            <div className="absolute top-10 right-6 md:right-10 w-[50%] opacity-[0.1] group-hover:opacity-[0.2] transition-all duration-700">
              <div className="flex flex-col gap-2.5">
                {[
                  { color: "bg-secondary", widths: ["30%", "25%", "45%"] },
                  { color: "bg-primary", widths: ["20%", "40%", "40%"] },
                  { color: "bg-tertiary", widths: ["50%", "15%", "35%"] },
                ].map((track, ti) => (
                  <div key={ti} className="flex gap-1 items-center">
                    <div className={`w-2.5 h-5 rounded-sm ${track.color}/50`} />
                    <div className="flex-1 h-5 rounded-md bg-white/5 flex overflow-hidden gap-px">
                      {track.widths.map((w, wi) => (
                        <div
                          key={wi}
                          className={`h-full ${track.color}/30 rounded-sm`}
                          style={{ width: w }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-0.5 mt-1.5">
                  {["bg-red-500/30", "bg-orange-400/25", "bg-yellow-400/25", "bg-green-500/25", "bg-cyan-400/30", "bg-blue-500/25", "bg-violet-500/25"].map(
                    (c, i) => (
                      <div key={i} className={`flex-1 h-1.5 rounded-sm ${c}`} />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/15 flex items-center justify-center text-secondary group-hover:shadow-[0_0_25px_-5px_rgba(0,193,253,0.25)] transition-all duration-500">
                <Film size={22} strokeWidth={1.8} />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-headline font-bold mb-3 text-on-background tracking-tight">
                {t("service1Title")}
              </h3>
              <p className="text-on-surface-variant leading-relaxed max-w-md text-[15px]">
                {t("service1Desc")}
              </p>
            </div>
          </motion.div>

          {/* ── Property Reels — compact ── */}
          <motion.div
            className="md:col-span-5 group relative rounded-[1.75rem] p-8 md:p-10 min-h-[420px] flex flex-col justify-between overflow-hidden cursor-pointer border border-white/[0.05] hover:border-tertiary/25 transition-all duration-500"
            style={{
              background:
                "linear-gradient(165deg, rgba(32,22,36,0.95) 0%, rgba(16,12,22,0.98) 100%)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700">
              <div className="absolute top-[-10%] left-[15%] w-[55%] h-[55%] bg-tertiary/25 rounded-full blur-[90px]" />
            </div>

            {/* Phone mockup */}
            <div className="absolute top-8 right-6 md:right-10 opacity-[0.12] group-hover:opacity-[0.22] transition-all duration-700 group-hover:-translate-y-1">
              <div className="w-[100px] h-[180px] rounded-[18px] border-2 border-tertiary/40 bg-tertiary/5 p-1.5 relative">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-tertiary/25" />
                <div className="w-full h-full rounded-[12px] bg-gradient-to-b from-tertiary/12 to-primary/8 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-white/25 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-white/40 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 border border-tertiary/15 flex items-center justify-center text-tertiary group-hover:shadow-[0_0_25px_-5px_rgba(255,93,215,0.25)] transition-all duration-500">
                <Play size={22} strokeWidth={1.8} />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-headline font-bold mb-3 text-on-background tracking-tight">
                {t("service2Title")}
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                {t("service2Desc")}
              </p>
            </div>
          </motion.div>

          {/* ── Social Media Design — full width ── */}
          <motion.div
            className="md:col-span-12 group relative rounded-[1.75rem] p-8 md:p-10 min-h-[320px] md:min-h-[280px] flex flex-col md:flex-row md:items-end justify-between overflow-hidden cursor-pointer border border-white/[0.05] hover:border-primary/20 transition-all duration-500 gap-6"
            style={{
              background:
                "linear-gradient(175deg, rgba(26,26,38,0.95) 0%, rgba(14,14,20,0.98) 100%)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Multi-glow */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700">
              <div className="absolute top-[5%] right-[15%] w-[35%] h-[40%] bg-primary/18 rounded-full blur-[80px]" />
              <div className="absolute bottom-[5%] right-[35%] w-[25%] h-[35%] bg-secondary/12 rounded-full blur-[60px]" />
              <div className="absolute top-[20%] left-[5%] w-[25%] h-[30%] bg-tertiary/8 rounded-full blur-[50px]" />
            </div>

            {/* Floating social cards */}
            <div className="absolute top-6 right-4 md:right-10 flex gap-3 opacity-[0.1] group-hover:opacity-[0.2] transition-all duration-700">
              <div className="w-[80px] h-[95px] rounded-lg border border-primary/25 bg-primary/5 p-1.5 rotate-[-2deg] group-hover:rotate-[-0.5deg] transition-transform duration-700">
                <div className="w-full h-[60%] rounded bg-gradient-to-br from-primary/25 to-secondary/15 mb-1.5" />
                <div className="w-[65%] h-1 rounded-full bg-white/18 mb-0.5" />
                <div className="w-[45%] h-1 rounded-full bg-white/12" />
              </div>
              <div className="w-[80px] h-[100px] rounded-lg border border-secondary/20 bg-secondary/5 p-1.5 rotate-[1.5deg] mt-3 group-hover:rotate-[0.5deg] transition-transform duration-700">
                <div className="w-full h-[65%] rounded bg-gradient-to-br from-secondary/20 to-tertiary/12 mb-1.5" />
                <div className="w-[55%] h-1 rounded-full bg-white/15 mb-0.5" />
                <div className="w-[70%] h-1 rounded-full bg-white/10" />
              </div>
              <div className="w-[70px] h-[85px] rounded-lg border border-tertiary/18 bg-tertiary/5 p-1.5 rotate-[-1deg] mt-6 hidden md:block group-hover:rotate-[0.5deg] transition-transform duration-700">
                <div className="w-full h-[55%] rounded bg-gradient-to-br from-tertiary/18 to-primary/12 mb-1.5" />
                <div className="w-[60%] h-1 rounded-full bg-white/14" />
              </div>
            </div>

            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-tertiary/8 border border-primary/12 flex items-center justify-center text-primary group-hover:shadow-[0_0_25px_-5px_rgba(192,156,255,0.2)] transition-all duration-500 mb-6">
                <Palette size={22} strokeWidth={1.8} />
              </div>
              <h3 className="text-3xl md:text-4xl font-headline font-bold mb-3 text-on-background tracking-tight">
                {t("service3Title")}
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px]">
                {t("service3Desc")}
              </p>
            </div>

            {/* Platform pills */}
            <div className="relative z-10 flex flex-wrap gap-2 md:pb-1">
              {["Instagram", "TikTok", "Facebook"].map((p) => (
                <span
                  key={p}
                  className="px-3.5 py-1.5 rounded-full text-[10px] font-label uppercase tracking-wider bg-white/[0.04] border border-white/[0.06] text-on-surface-variant/70"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
