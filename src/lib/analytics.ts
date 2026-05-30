// Third-party analytics, loaded lazily after the page is interactive so they
// never block first paint or the WebGL boot. Ported from the v2 site:
// Google Analytics, Microsoft Clarity, Cronitor RUM, and the Consent Manager
// (CMP) banner. reCAPTCHA + Supabase from v2 are intentionally dropped — v3
// has no backend to validate against.
//
// All loaders run from this bundled module (CSP script-src 'self'); the remote
// script origins are whitelisted in public/_headers.

const GA_ID = "G-DZ9M04CMED";
const CLARITY_ID = "6bd6d9vgmz";
const CRONITOR_KEY = "cb0b831aed3df3a78b091665fb2a474c";
const CMP_SCRIPT = "https://cdn.consentmanager.net/delivery/autoblocking/d33cb86fe179d.js";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    cronitor?: ((...args: unknown[]) => void) & { q?: unknown[] };
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

function loadGoogleAnalytics() {
  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  s.onload = () => {
    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID);
  };
  document.head.appendChild(s);
}

function loadClarity() {
  (function (c: Window, l: Document, a: string, i: string) {
    c.clarity =
      c.clarity ||
      function (...args: unknown[]) {
        (c.clarity!.q = c.clarity!.q || []).push(args);
      };
    const t = l.createElement("script");
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(a)[0];
    y.parentNode!.insertBefore(t, y);
  })(window, document, "script", CLARITY_ID);
}

function loadCronitor() {
  const s = document.createElement("script");
  s.src = "https://rum.cronitor.io/script.js";
  s.async = true;
  s.onload = () => {
    window.cronitor =
      window.cronitor ||
      function (...args: unknown[]) {
        (window.cronitor!.q = window.cronitor!.q || []).push(args);
      };
    window.cronitor("config", { clientKey: CRONITOR_KEY });
  };
  document.head.appendChild(s);
}

function loadConsentManager() {
  const cm = document.createElement("script");
  cm.src = CMP_SCRIPT;
  cm.async = true;
  cm.setAttribute("data-cmp-ab", "1");
  cm.setAttribute("data-cmp-host", "c.delivery.consentmanager.net");
  cm.setAttribute("data-cmp-cdn", "cdn.consentmanager.net");
  cm.setAttribute("data-cmp-codesrc", "16");
  document.head.appendChild(cm);
}

export function initAnalytics() {
  const start = () => {
    loadConsentManager();
    loadGoogleAnalytics();
    loadClarity();
    loadCronitor();
  };
  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }
}
