// ==========================
// SHOPPING CART LOGIC
// Guests: cart lives in localStorage (unchanged from before).
// Logged-in users: cart lives in Supabase, tied to their account,
// and follows them across devices.
// ==========================

import { products } from "../data/products.js";
import { supabase } from "./supabaseClient.js";

const STORAGE_KEY = "perfume-sandal-cart";

let cartItems = [];
let currentUserId = null;

// ==========================
// LOADING: from localStorage (guest) or Supabase (logged in)
// ==========================

function loadLocalCart() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveLocalCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

async function loadCartFromSupabase() {
  const { data, error } = await supabase
    .from("cart_items")
    .select("product_id, quantity")
    .eq("user_id", currentUserId);

  if (error) {
    console.error("Failed to load cart from Supabase:", error.message);
    return [];
  }

  return data.map((row) => ({ id: row.product_id, quantity: row.quantity }));
}

async function loadCart() {
  cartItems = currentUserId ? await loadCartFromSupabase() : loadLocalCart();
  renderCart();
}

// ==========================
// PERSISTING a change to whichever source is active
// ==========================

async function persistUpsert(productId, quantity) {
  if (currentUserId) {
    const { error } = await supabase
      .from("cart_items")
      .upsert({ user_id: currentUserId, product_id: productId, quantity });

    if (error) console.error("Failed to save cart item:", error.message);
  } else {
    saveLocalCart();
  }
}

async function persistRemoval(productId) {
  if (currentUserId) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", currentUserId)
      .eq("product_id", productId);

    if (error) console.error("Failed to remove cart item:", error.message);
  } else {
    saveLocalCart();
  }
}

// ==========================
// STATE-CHANGING ACTIONS (optimistic: update UI first, persist after)
// ==========================

export function addToCart(productId, quantity = 1) {
  const existingItem = cartItems.find((item) => item.id === productId);
  const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

  if (existingItem) {
    existingItem.quantity = newQuantity;
  } else {
    cartItems.push({ id: productId, quantity: newQuantity });
  }

  renderCart();
  persistUpsert(productId, newQuantity);
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  renderCart();
  persistRemoval(productId);
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  const item = cartItems.find((item) => item.id === productId);
  if (item) item.quantity = newQuantity;

  renderCart();
  persistUpsert(productId, newQuantity);
}

function getCartTotal() {
  return cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

function getCartCount() {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
}

// ==========================
// RENDERING
// ==========================

function renderCartItem(item) {
  const product = products.find((p) => p.id === item.id);
  if (!product) return "";

  return `
    <div class="cart-item">
      <img src="${product.image}" alt="${product.name}" class="cart-item__image" />
      <div class="cart-item__info">
        <p class="cart-item__name">${product.name}</p>
        <p class="cart-item__price">$${product.price.toFixed(2)}</p>
        <div class="cart-item__quantity">
          <button class="cart-item__qty-btn" data-action="decrease" data-id="${product.id}">−</button>
          <span>${item.quantity}</span>
          <button class="cart-item__qty-btn" data-action="increase" data-id="${product.id}">+</button>
        </div>
      </div>
      <button class="cart-item__remove" data-action="remove" data-id="${product.id}" aria-label="Remove ${product.name}">✕</button>
    </div>
  `;
}

function renderCart() {
  const itemsContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const badge = document.getElementById("cart-badge");

  if (!itemsContainer || !totalEl || !badge) return;

  itemsContainer.innerHTML =
    cartItems.length > 0
      ? cartItems.map(renderCartItem).join("")
      : `<p class="cart-drawer__empty">Your cart is empty.</p>`;

  totalEl.textContent = `$${getCartTotal().toFixed(2)}`;

  const count = getCartCount();
  badge.textContent = count;
  badge.hidden = count === 0;
}

// ==========================
// DRAWER OPEN / CLOSE
// ==========================

function openCart() {
  document.getElementById("cart-drawer").classList.add("cart-drawer--open");
  document.getElementById("cart-overlay").hidden = false;
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("cart-drawer--open");
  document.getElementById("cart-overlay").hidden = true;
}

// ==========================
// INIT
// ==========================

export function initCart() {
  document.getElementById("cart-toggle-btn")?.addEventListener("click", openCart);
  document.getElementById("cart-close-btn")?.addEventListener("click", closeCart);
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);

  document.addEventListener("click", (event) => {
    const addBtn = event.target.closest(".product-card__btn");
    if (addBtn) {
      addToCart(Number(addBtn.dataset.id));
      openCart();
      return;
    }

    const actionBtn = event.target.closest("[data-action]");
    if (!actionBtn) return;

    const productId = Number(actionBtn.dataset.id);
    const action = actionBtn.dataset.action;
    const item = cartItems.find((item) => item.id === productId);

    if (action === "increase" && item) updateQuantity(productId, item.quantity + 1);
    if (action === "decrease" && item) updateQuantity(productId, item.quantity - 1);
    if (action === "remove") removeFromCart(productId);
  });

  if (supabase) {
    // Fires immediately with the current session, and again on every
    // future login/logout — reloading the cart from the correct source
    // each time.
    supabase.auth.onAuthStateChange((event, session) => {
      const newUserId = session?.user?.id ?? null;
      if (newUserId !== currentUserId) {
        currentUserId = newUserId;
        loadCart();
      }
    });
  } else {
    // Supabase not configured — behave exactly like before (guest-only).
    loadCart();
  }
}