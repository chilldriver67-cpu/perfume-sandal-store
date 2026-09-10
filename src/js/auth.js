// ==========================
// AUTHENTICATION
// Handles login, signup, logout, and reactive auth-state UI updates
// ==========================

import { supabase } from "./supabaseClient.js";

let mode = "login"; // "login" | "signup"
let currentUser = null;

function showMessage(text, type) {
  const messageEl = document.getElementById("auth-message");
  messageEl.textContent = text;
  messageEl.hidden = false;
  messageEl.className = `auth-modal__message auth-modal__message--${type}`;
}

function setMode(newMode) {
  mode = newMode;

  const title = document.getElementById("auth-modal-title");
  const submitBtn = document.getElementById("auth-submit-btn");
  const switchText = document.getElementById("auth-switch-text");
  const switchBtn = document.getElementById("auth-switch-btn");

  if (mode === "login") {
    title.textContent = "Log In";
    submitBtn.textContent = "Log In";
    switchText.textContent = "Don't have an account?";
    switchBtn.textContent = "Sign Up";
  } else {
    title.textContent = "Sign Up";
    submitBtn.textContent = "Sign Up";
    switchText.textContent = "Already have an account?";
    switchBtn.textContent = "Log In";
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;

  const { error } =
    mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

  if (error) {
    showMessage(error.message, "error");
    return;
  }

  if (mode === "login") {
    showMessage("Logged in successfully!", "success");
    setTimeout(() => document.getElementById("auth-modal").close(), 800);
  } else {
    showMessage("Account created! Check your email to confirm.", "success");
  }
}

async function handleLogout() {
  await supabase.auth.signOut();
  document.getElementById("account-dropdown").hidden = true;
}

// ==========================
// REACTIVE UI: runs every time auth state changes
// ==========================

function updateAccountUI() {
  const emailEl = document.getElementById("account-dropdown-email");
  if (currentUser && emailEl) {
    emailEl.textContent = currentUser.email;
  }
}

function toggleAccountDropdown() {
  const dropdown = document.getElementById("account-dropdown");
  dropdown.hidden = !dropdown.hidden;
}

export function initAuth() {
    if (!supabase) return; // Supabase not configured yet — skip auth wiring entirely
  const modal = document.getElementById("auth-modal");
  const openBtn = document.getElementById("account-toggle-btn");
  const closeBtn = document.getElementById("auth-modal-close");
  const form = document.getElementById("auth-form");
  const switchBtn = document.getElementById("auth-switch-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (!modal || !openBtn || !closeBtn || !form || !switchBtn || !logoutBtn) return;

  openBtn.addEventListener("click", () => {
    if (currentUser) {
      toggleAccountDropdown();
    } else {
      modal.showModal();
    }
  });

  closeBtn.addEventListener("click", () => modal.close());
  form.addEventListener("submit", handleAuthSubmit);
  logoutBtn.addEventListener("click", handleLogout);

  switchBtn.addEventListener("click", () => {
    setMode(mode === "login" ? "signup" : "login");
  });

  // Fires immediately with the current session (even if nothing has
  // "changed" yet), and again on every future login/logout/session restore.
  supabase.auth.onAuthStateChange((event, session) => {
    currentUser = session?.user ?? null;
    updateAccountUI();
    document.getElementById("account-dropdown").hidden = true;
  });
}
