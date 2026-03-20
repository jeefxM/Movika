"use client";

import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPostPage() {
  const params = useParams();
  const t = useTranslations("Blog");
  const locale = useLocale() as "en" | "ka";
  const post = getPostBySlug(params.slug as string);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#1a1a1a] text-white font-sans">
        <Navbar />
        <div className="pt-32 pb-24 px-6 md:px-24 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("notFound")}</h1>
          <Link href="/blog" className="text-cyan hover:underline">
            {t("backToBlog")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const localized = post[locale];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#1a1a1a] text-white font-sans">
      <Navbar />
      <article className="pt-32 pb-24 px-6 md:px-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} /> {t("backToBlog")}
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <time>
              {new Date(post.date).toLocaleDateString(
                locale === "ka" ? "ka-GE" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} {t("minRead")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8 leading-tight">
            {localized.title}
          </h1>
          <div className="rounded-3xl overflow-hidden mb-12">
            <img
              src={post.image}
              alt={localized.title}
              className="w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="prose prose-invert prose-lg max-w-none">
            {localized.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl font-bold mt-10 mb-4 text-white"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return (
                  <p key={i} className="text-gray-300 leading-relaxed mb-4 font-semibold">
                    {block.replace(/\*\*/g, "")}
                  </p>
                );
              }
              // Handle paragraphs with bold text inline
              const parts = block.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={i} className="text-gray-300 leading-relaxed mb-4">
                  {parts.map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j} className="text-white font-semibold">
                        {part.replace(/\*\*/g, "")}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
