// ==========================
// FOOTER LOGIC
// Keeps the copyright year current automatically
// ==========================

export function initFooter() {
  const yearEl = document.getElementById("footer-year");
  if (!yearEl) return;

  const currentYear = new Date().getFullYear();
  yearEl.textContent = `© ${currentYear} Maison Éclat. All rights reserved.`;
}
