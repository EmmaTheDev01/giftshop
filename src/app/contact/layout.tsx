import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: `Contact Command Center | ${SITE_CONFIG.name}`,
  description:
    'Connect directly with our Command Center concierge team at commandcenter@lifelines.global for order support, bespoke laser engraving, or corporate inquiries.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
