import { inject } from '@vercel/analytics';

export function VercelAnalytics() {
  inject(); // This injects the tracking script once
  return null; // Nothing to render
}
