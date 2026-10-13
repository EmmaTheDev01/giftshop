export const SITE_CONFIG = {
  // Brand name (easily editable when you decide on the final name)
  name: "Memoriq",
  shortName: "Memoriq",
  domain: "memoriq.lifelines.global",
  tagline: "Curated North American Artisan Keepsakes | Canada & USA",
  country: "Canada & USA",
  currency: {
    code: "CAD",
    symbol: "$",
    locale: "en-CA",
    display: "$",
  },
  freeShippingThreshold: 95, // in CAD
  shippingNotice: "Express shipping across Canada & the United States 🇨🇦 🇺🇸",
  announcement: "Bespoke Delivery Across Canada & USA • Free Shipping Over $95 CAD / $70 USD 🇨🇦 🇺🇸",
  locations: "Toronto • New York • Montreal • Chicago • Vancouver",
  contact: {
    email: "concierge@memoriq.lifelines.global",
    phone: "+1 (800) 555-GIFT",
  },
};

export function formatCAD(amount: number): string {
  return `$${amount.toFixed(2)} CAD`;
}

export function formatCADShort(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
