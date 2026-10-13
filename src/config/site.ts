export const SITE_CONFIG = {
  // Brand name (easily editable when you decide on the final name)
  name: "Memoriq",
  shortName: "Memoriq",
  domain: "memoriq.lifelines.gloabl",
  tagline: "Curated Canadian & Artisan Keepsakes",
  country: "Canada",
  currency: {
    code: "CAD",
    symbol: "$",
    locale: "en-CA",
    display: "$",
  },
  freeShippingThreshold: 95, // in CAD
  shippingNotice: "Free Canadian shipping on orders over $95 CAD 🇨🇦",
  announcement: "Nationwide delivery across Canada • Free shipping over $95 CAD • Curated Gift Boutique 🍁",
  locations: "Montreal • Toronto • Vancouver",
  contact: {
    email: "bonjour@thegiftshop.ca",
    phone: "+1 (800) 555-GIFT",
  },
};

export function formatCAD(amount: number): string {
  return `$${amount.toFixed(2)} CAD`;
}

export function formatCADShort(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
