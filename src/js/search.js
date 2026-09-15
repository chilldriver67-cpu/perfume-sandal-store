// ==========================
// SEARCH
// Live-filters products by name or category as the user types,
// reusing the existing Product Details modal for results.
// ==========================

import { products } from "../data/products.js";
import { openProductModal } from "./productDetails.js";

function matchesSearch(product, term) {
  const lowerTerm = term.toLowerCase();
  return (
    product.name.toLowerCase().includes(lowerTerm) ||
    product.category.toLowerCase().includes(lowerTerm)
  );
}

function renderResultItem(product) {
  return `
    <button class="search-result" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="search-result__image" />
      <div class="search-result__info">
        <p class="search-result__name">${product.name}</p>
        <p class="search-result__category">${product.category}</p>
      </div>
    </button>
  `;
}

function renderResults(term) {
  const resultsEl = document.getElementById("search-results");

  if (!term.trim()) {
    resultsEl.innerHTML = "";
    return;
  }

  const matches = products.filter((product) => matchesSearch(product, term));

  resultsEl.innerHTML =
    matches.length > 0
      ? matches.map(renderResultItem).join("")
      : `<p class="search-modal__empty">No products found for "${term}".</p>`;
}

export function initSearch() {
  const modal = document.getElementById("search-modal");
  const openBtn = document.getElementById("search-toggle-btn");
  const closeBtn = document.getElementById("search-modal-close");
  const input = document.getElementById("search-input");

  if (!modal || !openBtn || !closeBtn || !input) return;

  openBtn.addEventListener("click", () => {
    modal.showModal();
    input.value = "";
    document.getElementById("search-results").innerHTML = "";
    input.focus();
  });

  closeBtn.addEventListener("click", () => modal.close());

  input.addEventListener("input", () => {
    renderResults(input.value);
  });

  // Event delegation: search results are re-rendered on every keystroke,
  // so we listen on the results container itself rather than individual
  // result buttons.
  document.getElementById("search-results").addEventListener("click", (event) => {
    const resultBtn = event.target.closest(".search-result");
    if (!resultBtn) return;

    const productId = Number(resultBtn.dataset.id);
    modal.close();
    openProductModal(productId);
  });
}