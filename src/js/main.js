// ==========================
// APP ENTRY POINT
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
import { initSearch } from "./search.js";

console.log("Perfume & Sandal Store — app initialized (v0.18)");

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
initSearch();