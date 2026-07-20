import { useEffect } from "react";

/**
 * Sets page-level <title>, <meta name="description">, and <meta name="keywords">
 * for improved per-page SEO. Falls back to base values on unmount.
 */
const BASE_TITLE = "Iowa Structure Cabling Solution LLC | Structured Cabling & Low-Voltage Contractor in Iowa";
const BASE_DESC = "Professional structured cabling and low-voltage installation services for Iowa businesses. CAT6 drops, fiber optic runs, network closet buildouts, rack cleanup, Wi-Fi AP installation, and CCTV prewire. Free estimates for commercial projects.";
const BASE_KEYWORDS = "structured cabling Iowa, low-voltage contractor Iowa, CAT6 installation Iowa, fiber optic termination Iowa, network closet buildout Iowa, Wi-Fi access point installation Iowa, commercial cabling contractor Iowa";

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function usePageSEO({ title, description, keywords }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);

    return () => {
      document.title = BASE_TITLE;
      setMeta("description", BASE_DESC);
      setMeta("keywords", BASE_KEYWORDS);
    };
  }, [title, description, keywords]);
}