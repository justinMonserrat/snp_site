/**
 * Shared service catalog (normalized)
 * - Consistent top-level fields for every service:
 *   slug, title, blurb, price, duration, deliverables[], bestFor[], img, alt
 * - Packages include: name, duration, deliverables[], (optional) description, price, notes[]
 * - Add-ons/notes optional per service
 */

export const services = [
  /* =========================
     Family Session
     ========================= */
  {
    slug: "family",
    title: "Family",
    blurb: "30–90 min • 12–20+ edited images",
    price: "$250–$350+",
    duration: "30–90 minutes",
    img: "/images/home/snp_lifestyle.jpg",
    alt: "Parents holding newborn in park",
    deliverables: ["12–20+ edited images", "Online gallery", "Print rights"],
    bestFor: ["Immediate family", "Lifestyle", "Outdoors or in-home"],
    packages: [
      {
        name: "Family Mini",
        duration: "30 minutes",
        deliverables: ["12 edited images", "One local location", "Online gallery"],
        price: "$250",
        notes: [],
      },
      {
        name: "Family Classic",
        duration: "60 minutes",
        deliverables: ["20+ edited images", "Styling guidance", "Online gallery"],
        price: "$300",
        notes: [],
      },
      {
        name: "Family Plus",
        duration: "90 minutes",
        deliverables: ["25+ edited images", "2 nearby spots or outfit change", "Online gallery"],
        price: "$350+",
        notes: [],
      },
    ],
  },

  /* =========================
     Maternity (3 tiers)
     ========================= */
  {
    slug: "maternity",
    title: "Maternity",
    blurb: "20–90 min • 12–35+ edited images",
    price: "$250–$425",
    duration: "20–90 minutes",
    img: "/images/home/snp_maternity.jpg",
    alt: "Sunlit maternity portrait",
    deliverables: ["Edited images", "Online gallery", "Print rights"],
    bestFor: ["Weeks 28–34", "Golden hour", "Solo or couple"],
    packages: [
      {
        name: "Short & Sweet",
        duration: "20–30 minutes",
        deliverables: ["12 edited images", "One local location", "Online gallery"],
        price: "$250",
        notes: [],
      },
      {
        name: "Sticking to the Basics",
        duration: "60 minutes",
        deliverables: [
          "25+ edited images",
          "Access to 1 client-closet dress",
          "One local location",
          "Online gallery",
        ],
        price: "$375",
        notes: [],
      },
      {
        name: "The Total Bump",
        duration: "90 minutes",
        deliverables: [
          "35+ edited images",
          "Access to 2 client-closet dresses",
          "One location",
          "Online gallery",
        ],
        price: "$425",
        notes: [],
      },
    ],
  },

  /* =========================
     Newborn (Lifestyle, 2 tiers)
     ========================= */
  {
    slug: "newborn",
    title: "Newborn",
    blurb: "In-home lifestyle • gentle posing",
    price: "$250–$350+",
    duration: "30–90+ minutes",
    img: "/images/home/homePortfolio/snp_p_newborn.jpg", // TODO: swap to a newborn image
    alt: "Lifestyle newborn at home",
    deliverables: ["Edited images", "Online gallery", "Print rights"],
    bestFor: ["In-home lifestyle", "Newborn + family", "Natural moments"],
    packages: [
      {
        name: "First Moments (Mini)",
        duration: "30–45 minutes (in-home)",
        deliverables: ["12 edited images", "Online gallery"],
        price: "$250",
        notes: ["Posed by photographer", "No wraps/props included"],
      },
      {
        name: "Bundle of Joy",
        duration: "90+ minutes (in-home)",
        deliverables: ["20+ edited images", "Online gallery"],
        price: "$350+",
        notes: ["Posed by photographer", "Wraps/props provided"],
      },
    ],
  },

  /* =========================
     Cake Smash (3 tiers) + add-ons
     ========================= */
  {
    slug: "cake-smash",
    title: "Cake Smash",
    blurb: "30–90 min • 8–30+ edited images",
    price: "$225–$350",
    duration: "30–90 minutes",
    img: "/images/home/snp_cakesmash.jpg",
    alt: "Toddler at first birthday cake smash",
    deliverables: ["Edited images", "Online private gallery", "Print rights"],
    bestFor: ["1st birthdays", "Studio or backyard", "Color themes"],
    packages: [
      {
        name: "The Mini",
        duration: "30 minutes",
        deliverables: ["8–12+ hand-edited images", "One local location", "Private gallery"],
        price: "$225",
        notes: ["Cake provided by Client"],
      },
      {
        name: "The Mini Plus",
        duration: "45–50 minutes",
        deliverables: ["18–20+ hand-edited images", "One local location", "Private gallery"],
        price: "$275",
        notes: ["Cake provided by Janine"],
      },
      {
        name: "The Full Smash",
        duration: "60–90 minutes",
        deliverables: ["30+ hand-edited images", "One local location", "Private gallery"],
        price: "$350",
        notes: ["Cake provided by Janine"],
      },

    ],
  },

  /* =========================
     Bundle Deals (2 options)
     ========================= */
  {
    slug: "bundles",
    title: "Bundles",
    blurb: "Save by booking maternity + newborn",
    price: "$400–$625",
    duration: "Varies by bundle",
    img: "/images/home/snp_bundle.jpg", // TODO: swap to a bundle collage
    alt: "Bundle deals collage",
    deliverables: ["Two sessions", "Edited galleries", "Print rights"],
    bestFor: ["Expecting parents", "Plan ahead savings", "Coordinated styling"],
    packages: [
      {
        name: "Belly to Baby Mini",
        duration: "Maternity Short & Sweet + Newborn First Moments",
        deliverables: ["Two mini sessions", "12 images per session", "Two online galleries"],
        price: "$400",
        notes: ["$100 savings vs. booking separately"],
      },
      {
        name: "Glow & Grow",
        duration: "Maternity Total Bump + Newborn Bundle of Joy",
        deliverables: ["Two full sessions", "25+/20+ images", "Two online galleries"],
        price: "$625",
        notes: ["$150 savings vs. booking separately"],
      },
    ],
  },
];

/** Helper: look up a service by slug */
export function getService(slug) {
  return services.find((s) => s.slug === slug);
}
