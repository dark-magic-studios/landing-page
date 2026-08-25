export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

interface EventParams {
  category: string;
  label?: string;
  value?: number;
}

export function trackEvent(action: string, { category, label, value }: EventParams) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}
