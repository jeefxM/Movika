"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { FAQSchema } from "./StructuredData";

const faqKeys = [1, 2, 3, 4, 5, 6] as const;

export default function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = faqKeys.map((n) => ({
    question: t(`q${n}`),
    answer: t(`a${n}`),
  }));

  return (
    <section id="faq" className="py-24 px-8">
      <FAQSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto">
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
        </motion.div>
        <div className="space-y-4">
          {faqKeys.map((n) => (
            <motion.div
              key={n}
              className="border border-outline-variant/15 bg-surface-container-high rounded-2xl overflow-hidden transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: n * 0.05 }}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center font-medium text-lg hover:bg-surface-container-highest transition-colors text-on-background cursor-pointer"
                onClick={() => setOpenIndex(openIndex === n ? null : n)}
              >
                {t(`q${n}`)}
                {openIndex === n ? (
                  <ChevronUp size={20} className="text-primary shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-on-surface-variant shrink-0" />
                )}
              </button>
              {openIndex === n && (
                <div className="px-6 pb-5 text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
                  {t(`a${n}`)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
