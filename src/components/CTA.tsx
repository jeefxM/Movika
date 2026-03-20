"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export default function CTA() {
  const t = useTranslations("CTA");

  return (
    <section className="py-24 px-8">
      <motion.div
        className="max-w-5xl mx-auto rounded-[3rem] kinetic-gradient p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-7xl font-headline font-bold text-on-primary-container tracking-tighter">
            {t("title")}
          </h2>
          <p className="text-on-primary-container/80 text-xl max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <button className="bg-on-primary-container text-primary px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-xl font-headline">
            {t("button")}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
