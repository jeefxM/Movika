"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { MessageCircle, Sparkles, TrendingUp } from "lucide-react";

const steps = [
  {
    titleKey: "step1Title" as const,
    descKey: "step1Desc" as const,
    icon: MessageCircle,
    accent: "primary",
  },
  {
    titleKey: "step2Title" as const,
    descKey: "step2Desc" as const,
    icon: Sparkles,
    accent: "secondary",
  },
  {
    titleKey: "step3Title" as const,
    descKey: "step3Desc" as const,
    icon: TrendingUp,
    accent: "tertiary",
  },
];

const accentMap = {
  primary: {
    iconBg: "bg-primary/10 border-primary/15",
    iconColor: "text-primary",
    num: "text-primary/15",
    line: "from-primary/20",
  },
  secondary: {
    iconBg: "bg-secondary/10 border-secondary/15",
    iconColor: "text-secondary",
    num: "text-secondary/15",
    line: "from-secondary/20",
  },
  tertiary: {
    iconBg: "bg-tertiary/10 border-tertiary/15",
    iconColor: "text-tertiary",
    num: "text-tertiary/15",
    line: "from-tertiary/20",
  },
};

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <section id="how-it-works" className="py-28 px-6 md:px-8 bg-surface-container-low relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const a = accentMap[step.accent as keyof typeof accentMap];
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                className="relative p-8 md:p-10 rounded-[1.75rem] border border-white/[0.05] bg-surface-container-high/50 backdrop-blur-sm overflow-hidden group hover:border-white/[0.08] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Large step number */}
                <span
                  className={`absolute top-6 right-8 text-[7rem] md:text-[8rem] font-headline font-black leading-none ${a.num} select-none pointer-events-none`}
                >
                  {i + 1}
                </span>

                {/* Connector line (not on last) */}
                {i < 2 && (
                  <div
                    className={`hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r ${a.line} to-transparent z-10`}
                  />
                )}

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl ${a.iconBg} border flex items-center justify-center ${a.iconColor} mb-8`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-2xl font-headline font-bold mb-3 text-on-background">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-[15px]">
                    {t(step.descKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
