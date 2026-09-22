// ==========================
// CURRENCY FORMATTING
// Single source of truth for how prices are displayed across the site.
// Uses the browser's built-in Intl.NumberFormat — no library needed.
// To change currency later (e.g. letting the client choose), only this
// file needs to change.
// ==========================

const formatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
});

export function formatCurrency(amount) {
  return formatter.format(amount);
}