"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Clock, ArrowRight } from "lucide-react";
import { getLatestPosts } from "@/lib/blog";
import { motion } from "motion/react";

export default function Blog() {
  const t = useTranslations("Blog");
  const locale = useLocale() as "en" | "ka";
  const posts = getLatestPosts(3);

  return (
    <section id="blog" className="py-24 px-8 bg-surface-container-low">
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

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const localized = post[locale];
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-3xl bg-surface-container-high border border-outline-variant/10 overflow-hidden hover:bg-surface-container-highest transition-colors duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={localized.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant mb-3 font-label">
                      <time>
                        {new Date(post.date).toLocaleDateString(
                          locale === "ka" ? "ka-GE" : "en-US",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </time>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} {t("minRead")}
                      </span>
                    </div>
                    <h3 className="text-lg font-headline font-bold text-on-background mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {localized.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
                      {localized.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      {t("readMore")} <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-surface-container-highest hover:bg-surface-bright transition-all text-on-background font-bold tracking-wider uppercase border border-outline-variant/10"
          >
            {t("viewAll")} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
