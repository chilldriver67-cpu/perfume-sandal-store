// ==========================
// NAVBAR LOGIC
// Handles mobile menu toggle behavior
// ==========================

export function initNavbar() {
  const toggleBtn = document.querySelector(".navbar__menu-toggle");
  const links = document.querySelector(".navbar__links");

  if (!toggleBtn || !links) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = links.classList.toggle("navbar__links--open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });
}
