// ==========================
// IMAGE REVEAL
// Fades + "pops" an image in once it finishes loading, instead of it
// snapping into view abruptly.
//
// The native `load` event on an <img> does NOT bubble, so we can't
// delegate to a parent the way we do for clicks elsewhere — each image
// needs its own listener.
//
// If an image is already cached (e.g. the same product also appears in
// Best Sellers), the browser may finish loading it before our listener
// is even attached, and `load` would never fire. Checking `.complete`
// first catches that case.
// ==========================

export function revealImagesOnLoad(container) {
  const images = container.querySelectorAll("img[data-reveal]");

  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("is-loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    }
  });
}