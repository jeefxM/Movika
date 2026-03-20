"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const t = useTranslations("Blog");
  const locale = useLocale() as "en" | "ka";
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#1a1a1a] text-white font-sans">
      <Navbar />
      <div className="pt-32 pb-24 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} /> {t("backHome")}
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
            {t("pageTitle")}
          </h1>
          <p className="text-xl text-gray-400 mb-16">{t("pageSubtitle")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const localized = post[locale];
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/[0.08] transition-colors duration-300"
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
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <time>{new Date(post.date).toLocaleDateString(locale === "ka" ? "ka-GE" : "en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} {t("minRead")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">
                      {localized.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {localized.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-cyan text-sm font-medium group-hover:gap-2 transition-all">
                      {t("readMore")} <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
