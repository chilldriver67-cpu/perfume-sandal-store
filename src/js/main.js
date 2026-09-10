// ==========================
// APP ENTRY POINT
// This file wires together the other modules.
// CSS is imported here (not linked in HTML) — required for Vite dev mode:
// a <link rel="stylesheet"> tag causes Vite's dev server to serve the file
// as a JS module instead of raw CSS, which silently breaks styling.
// ==========================

import "../css/style.css";
import { initTheme } from "./theme.js";
import { initNavbar } from "./navbar.js";
import { initFeaturedProducts, initNewArrivals, initBestSellers } from "./products.js";
import { initTestimonials } from "./testimonials.js";
import { initNewsletter } from "./newsletter.js";
import { initFooter } from "./footer.js";
import { initCart } from "./cart.js";
import { initProductDetails } from "./productDetails.js";
import { initAuth } from "./auth.js";

console.log("Perfume & Sandal Store — app initialized (v0.16)");

initTheme();
initNavbar();
initFeaturedProducts();
initNewArrivals();
initBestSellers();
initTestimonials();
initNewsletter();
initFooter();
initCart();
initProductDetails();
initAuth();
