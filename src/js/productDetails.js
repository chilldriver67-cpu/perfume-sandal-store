// ==========================
// PRODUCT DETAILS MODAL
// Shows an expanded view of a single product with a quantity selector
// ==========================

import { products } from "../data/products.js";
import { addToCart } from "./cart.js";

let selectedQuantity = 1;

function renderModalContent(product) {
  return `
    <img src="${product.image}" alt="${product.name}" class="product-modal__image" />

    <div class="product-modal__info">
      <span class="product-card__category">${product.category}</span>
      <h2 class="product-modal__name">${product.name}</h2>
      <p class="product-modal__price">$${product.price.toFixed(2)}</p>
      <p class="product-modal__description">${product.description}</p>

      <div class="quantity-stepper">
        <button class="quantity-stepper__btn" id="modal-qty-decrease">−</button>
        <span id="modal-qty-value">1</span>
        <button class="quantity-stepper__btn" id="modal-qty-increase">+</button>
      </div>

      <button class="product-modal__add-btn" id="modal-add-to-cart" data-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
}

  export function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  selectedQuantity = 1;

  const content = document.getElementById("product-modal-content");
  content.innerHTML = renderModalContent(product);

  const modal = document.getElementById("product-modal");
  modal.showModal();

  document.getElementById("modal-qty-decrease").addEventListener("click", () => {
    selectedQuantity = Math.max(1, selectedQuantity - 1);
    document.getElementById("modal-qty-value").textContent = selectedQuantity;
  });

  document.getElementById("modal-qty-increase").addEventListener("click", () => {
    selectedQuantity += 1;
    document.getElementById("modal-qty-value").textContent = selectedQuantity;
  });

  document.getElementById("modal-add-to-cart").addEventListener("click", () => {
    addToCart(product.id, selectedQuantity);
    modal.close();
  });
}

export function initProductDetails() {
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("product-modal-close");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", () => modal.close());

  document.addEventListener("click", (event) => {
    if (event.target.closest(".product-card__btn")) return;

    const card = event.target.closest(".product-card");
    if (!card) return;

    const addBtn = card.querySelector(".product-card__btn");
    const productId = Number(addBtn?.dataset.id);
    if (productId) openProductModal(productId);
  });
}
