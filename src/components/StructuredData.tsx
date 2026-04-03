export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Movika",
    url: "https://reelestate-landing.vercel.app",
    logo: "https://reelestate-landing.vercel.app/movika_logo_original.png",
    description:
      "Social media content agency specializing in property reels and designs for real estate agents in Georgia.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+995557635623",
      contactType: "sales",
      availableLanguage: ["Georgian", "English"],
    },
    sameAs: [],
    areaServed: {
      "@type": "Country",
      name: "Georgia",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Movika",
    description:
      "Professional property reels, social media designs, and video editing for real estate agents.",
    url: "https://reelestate-landing.vercel.app",
    telephone: "+995557635623",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    priceRange: "20₾ - 250₾",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Social Media Content Creation",
    provider: {
      "@type": "Organization",
      name: "Movika",
    },
    areaServed: {
      "@type": "Country",
      name: "Georgia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Content Packages",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Test Reel",
          price: "0",
          priceCurrency: "GEL",
          description: "1 free test reel with 1 revision and fast delivery",
        },
        {
          "@type": "Offer",
          name: "5 Reels",
          price: "80",
          priceCurrency: "GEL",
          description: "5 property reels with 1 revision and fast delivery",
        },
        {
          "@type": "Offer",
          name: "20 Reels",
          price: "250",
          priceCurrency: "GEL",
          description: "20 property reels per month with fast delivery",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
