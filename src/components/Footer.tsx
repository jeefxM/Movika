"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-on-background/10 bg-surface-container-lowest">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image src="/movika_logo.png" alt="Movika — Real estate social media agency" width={100} height={25} className="h-[25px] w-auto object-contain" />
        </Link>

        <div className="flex flex-wrap justify-center gap-8 font-label text-sm tracking-wide">
          <a
            className="text-on-surface-variant hover:text-on-background transition-all duration-200 underline decoration-primary decoration-2 underline-offset-4"
            href="#"
          >
            Instagram
          </a>
          <a className="text-on-surface-variant hover:text-on-background transition-all duration-200" href="#">
            LinkedIn
          </a>
          <a className="text-on-surface-variant hover:text-on-background transition-all duration-200" href="#">
            Vimeo
          </a>
          <a className="text-on-surface-variant hover:text-on-background transition-all duration-200" href="#">
            {t("terms")}
          </a>
          <a className="text-on-surface-variant hover:text-on-background transition-all duration-200" href="#">
            Privacy
          </a>
        </div>

        <p className="text-on-surface-variant text-xs text-center md:text-right">
          &copy; {year} MOVIKA Studio. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
