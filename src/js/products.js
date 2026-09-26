// ==========================
// PRODUCTS RENDERING
// Reusable logic for turning product data into HTML product cards
// ==========================

import { products } from "../data/products.js";
import { formatCurrency } from "./currency.js";

// Build the HTML string for a single product card
function renderProductCard(product) {
  return `
    <article class="product-card squircle">
      <img src="${product.image}" alt="${product.name}" class="product-card__image" />
      <div class="product-card__info">
        <span class="product-card__category">${product.category}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__price">${formatCurrency(product.price)}</p>
        <button class="product-card__btn" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </article>
  `;
}

// Reusable renderer: fills ANY container with ANY list of products
function renderProducts(containerId, productList) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = productList.map(renderProductCard).join("");
}

// ==========================
// SECTION-SPECIFIC INITIALIZERS
// ==========================

export function initFeaturedProducts() {
  renderProducts("product-grid", products);
}

export function initNewArrivals() {
  const newProducts = products.filter((product) => product.isNew);
  renderProducts("new-arrivals-grid", newProducts);
}

export function initBestSellers() {
  const topSellers = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 3);

  renderProducts("best-sellers-grid", topSellers);
}
