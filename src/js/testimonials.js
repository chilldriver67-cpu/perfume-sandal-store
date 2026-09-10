// ==========================
// TESTIMONIALS RENDERING
// Turns testimonial data into HTML quote cards
// ==========================

import { testimonials } from "../data/testimonials.js";

// Build a string of star characters: filled stars for the rating, empty for the rest
function renderStars(rating) {
  const totalStars = 5;

  return Array.from({ length: totalStars })
    .map((_, index) => (index < rating ? "★" : "☆"))
    .join("");
}

// Build the HTML string for a single testimonial card
function renderTestimonialCard(testimonial) {
  return `
    <blockquote class="testimonial-card">
      <div class="testimonial-card__stars">${renderStars(testimonial.rating)}</div>
      <p class="testimonial-card__quote">"${testimonial.quote}"</p>
      <footer class="testimonial-card__author">— <cite>${testimonial.author}</cite></footer>
    </blockquote>
  `;
}

// Render all testimonials into the grid container
export function initTestimonials() {
  const grid = document.getElementById("testimonials-grid");
  if (!grid) return;

  grid.innerHTML = testimonials.map(renderTestimonialCard).join("");
}
