"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  { key: "t1", accent: "primary" },
  { key: "t2", accent: "secondary" },
  { key: "t3", accent: "tertiary" },
] as const;

const accentColors = {
  primary: "text-primary fill-primary",
  secondary: "text-secondary fill-secondary",
  tertiary: "text-tertiary fill-tertiary",
};

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="py-28 px-6 md:px-8" id="testimonials">
      <div className="max-w-7xl mx-auto">
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
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.key}
              className="p-8 rounded-[1.75rem] border border-white/[0.05] bg-surface-container-high/40 backdrop-blur-sm flex flex-col justify-between gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div>
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <Star
                      key={si}
                      size={14}
                      className={accentColors[item.accent]}
                    />
                  ))}
                </div>
                <p className="text-on-surface/90 leading-relaxed text-[15px]">
                  &ldquo;{t(`${item.key}Quote`)}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${
                    item.accent === "primary"
                      ? "from-primary/40 to-primary/15"
                      : item.accent === "secondary"
                      ? "from-secondary/40 to-secondary/15"
                      : "from-tertiary/40 to-tertiary/15"
                  } flex items-center justify-center text-xs font-bold text-on-background`}
                >
                  {t(`${item.key}Name`).charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-on-background">
                    {t(`${item.key}Name`)}
                  </p>
                  <p className="text-[11px] text-on-surface-variant font-label">
                    {t(`${item.key}Role`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
