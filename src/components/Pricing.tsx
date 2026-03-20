"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const tiers = [
  { key: "tier1", featured: false, checkColor: "text-primary", features: 4 },
  { key: "tier2", featured: false, checkColor: "text-secondary", features: 5 },
  { key: "tier3", featured: true, checkColor: "text-tertiary", features: 5 },
] as const;

export default function Pricing() {
  const t = useTranslations("Pricing");

  return (
    <section id="pricing" className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4 text-on-background">
            {t("title")}
          </h2>
          <p className="text-xl text-on-surface-variant">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              className={`p-8 rounded-3xl flex flex-col h-full relative cursor-pointer ${
                tier.featured
                  ? "glass-card transform md:-translate-y-4 glow-effect"
                  : "bg-surface-container-high border border-outline-variant/10"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.25 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {tier.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 kinetic-gradient px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-on-primary-container">
                  {t("tier3Badge")}
                </div>
              )}
              <h3 className="text-2xl font-headline font-bold mb-2 text-on-background">
                {t(`${tier.key}Name`)}
              </h3>
              <div className="text-4xl font-black mb-1 text-on-background font-headline">
                {t.has(`${tier.key}OldPrice`) && (
                  <span className="text-xl text-on-surface-variant/40 font-normal line-through mr-2">
                    {t(`${tier.key}OldPrice`)} {t("currency")}
                  </span>
                )}
                {t(`${tier.key}Price`)} {t("currency")}{" "}
                <span className="text-lg text-on-surface-variant font-normal font-body">
                  / {t(`${tier.key}Period`)}
                </span>
              </div>
              {/* Per-reel price anchor */}
              <div className="text-sm text-primary/70 font-label mb-4">
                {t(`${tier.key}PerUnit`)}
              </div>
              <p className="text-on-surface-variant mb-6">{t(`${tier.key}Desc`)}</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {Array.from({ length: tier.features }, (_, n) => n + 1).map((n) => (
                  <li key={n} className="flex items-center gap-3 text-on-background">
                    <Check size={20} className={tier.checkColor} />
                    {t(`${tier.key}Feature${n}`)}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/995557635623?text=${encodeURIComponent(t(`${tier.key}Name`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-full font-bold transition-all cursor-pointer text-center block ${
                  tier.featured
                    ? "kinetic-gradient text-on-primary-container hover:scale-[1.02] glow-effect"
                    : "bg-surface-container-highest hover:bg-surface-bright text-on-background"
                }`}
              >
                {t("cta")}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Guarantee / trust */}
        <motion.p
          className="text-center text-on-surface-variant/60 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {t("guarantee")}
        </motion.p>
      </div>
    </section>
  );
}
