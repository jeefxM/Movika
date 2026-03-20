import type { Metadata } from "next";

const siteUrl = "https://reelestate-landing.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Movika — Social Media Agency for Real Estate",
    template: "%s | Movika",
  },
  description:
    "Professional property reels, social media designs, and video editing for real estate agents in Georgia. Scroll-stopping content that sells listings faster. Starting from 79₾.",
  keywords: [
    "real estate social media",
    "property reels",
    "real estate video editing",
    "social media agency Georgia",
    "უძრავი ქონების სოციალური მედია",
    "უძრავი ქონების რილსები",
    "რილსები უძრავი ქონებისთვის",
    "სოციალური მედიის სააგენტო",
    "Movika",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
    languages: {
      en: `${siteUrl}/en`,
      ka: `${siteUrl}/ka`,
    },
  },
  openGraph: {
    type: "website",
    locale: "ka_GE",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Movika",
    title: "Movika — Social Media Agency for Real Estate",
    description:
      "Professional property reels and social media designs for real estate agents. First 3 reels free. Starting from 79₾/month.",
    images: [
      {
        url: `${siteUrl}/movika_logo_original.png`,
        width: 1200,
        height: 630,
        alt: "Movika — Real Estate Social Media Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movika — Social Media Agency for Real Estate",
    description:
      "Property reels & social media designs for real estate agents. First 3 reels free.",
    images: [`${siteUrl}/movika_logo_original.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
