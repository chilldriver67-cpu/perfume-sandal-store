// ==========================
// PRODUCT DETAILS MODAL
// Shows an expanded view of a single product with a quantity selector.
//
// SHARED ELEMENT TRANSITION: when a card's image is passed in, the modal
// visually grows out of that exact image (and shrinks back into it on
// close) using the native View Transitions API. Without it (e.g. the
// browser doesn't support it, or no source image is available), it just
// opens/closes normally — this is a progressive enhancement, not a
// requirement.
// ==========================

import { products } from "../data/products.js";
import { addToCart } from "./cart.js";

const TRANSITION_NAME = "product-hero-image";

let selectedQuantity = 1;
let sourceImageEl = null; // the card image the currently-open modal "grew from"

function supportsViewTransitions() {
  return typeof document.startViewTransition === "function";
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.decode) {
      // Never let a failed decode block the modal from opening
      img.decode().then(resolve).catch(resolve);
    } else {
      img.onload = resolve;
      img.onerror = resolve;
    }
  });
}

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

function attachModalListeners(product) {
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
    closeProductModal();
  });
}

function populateAndOpen(product, modal) {
  selectedQuantity = 1;
  const content = document.getElementById("product-modal-content");
  content.innerHTML = renderModalContent(product);
  modal.showModal();
  attachModalListeners(product);
}

export async function openProductModal(productId, clickedImageEl) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("product-modal");

  if (supportsViewTransitions() && clickedImageEl) {
    await preloadImage(product.image);

    clickedImageEl.style.viewTransitionName = TRANSITION_NAME;
    sourceImageEl = clickedImageEl;

    document.startViewTransition(() => {
      populateAndOpen(product, modal);
      clickedImageEl.style.viewTransitionName = "";
    });
  } else {
    populateAndOpen(product, modal);
  }
}

export function closeProductModal() {
  const modal = document.getElementById("product-modal");

  if (supportsViewTransitions() && sourceImageEl) {
    const returningTo = sourceImageEl;

    const transition = document.startViewTransition(() => {
      modal.close(); // modal's CSS-named image stops being rendered here...
      returningTo.style.viewTransitionName = TRANSITION_NAME; // ...so it's safe to name the card image now
    });

    transition.finished.finally(() => {
      returningTo.style.viewTransitionName = "";
      sourceImageEl = null;
    });
  } else {
    modal.close();
    sourceImageEl = null;
  }
}

export function initProductDetails() {
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("product-modal-close");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeProductModal);

  // Escape closes a <dialog> natively via a "cancel" event, bypassing our
  // close button entirely. Intercept it so Escape gets the same reverse
  // transition instead of an instant, jarring close.
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProductModal();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".product-card__btn")) return;

    const card = event.target.closest(".product-card");
    if (!card) return;

    const addBtn = card.querySelector(".product-card__btn");
    const productId = Number(addBtn?.dataset.id);
    const imageEl = card.querySelector(".product-card__image");

    if (productId) openProductModal(productId, imageEl);
  });
}