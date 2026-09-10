// ==========================
// PRODUCT DATA
// Images are hosted locally in src/assets/images (no external dependency).
// Replace these placeholder SVGs with real photos when the client provides
// them — just drop the files into src/assets/images and update the paths
// below.
// Temporary in-memory data until Supabase is connected (v2.0)
// ==========================

export const products = [
  {
    id: 1,
    name: "Velvet Oud",
    category: "Perfume",
    price: 128.0,
    image: "/src/assets/images/product-velvet-oud.svg",
    isNew: false,
    salesCount: 342,
    description: "A rich, smoky oud softened with vanilla and warm amber — deep and enveloping, built to last from morning into evening.",
  },
  {
    id: 2,
    name: "Rose Ember",
    category: "Perfume",
    price: 96.0,
    image: "/src/assets/images/product-rose-ember.svg",
    isNew: false,
    salesCount: 218,
    description: "A modern rose warmed by soft spice and a whisper of smoke — romantic without being sweet, elegant in every season.",
  },
  {
    id: 3,
    name: "Gilded Strap Sandal",
    category: "Sandals",
    price: 154.0,
    image: "/src/assets/images/product-gilded-sandal.svg",
    isNew: true,
    salesCount: 411,
    description: "Hand-finished leather straps in a soft champagne tone, set on a cushioned sole built for long days that still call for style.",
  },
  {
    id: 4,
    name: "Champagne Blossom",
    category: "Perfume",
    price: 112.0,
    image: "/src/assets/images/product-champagne-blossom.svg",
    isNew: false,
    salesCount: 97,
    description: "A bright bouquet of white florals and citrus over a creamy base — light, celebratory, and effortless to wear daily.",
  },
  {
    id: 5,
    name: "Pearl Woven Sandal",
    category: "Sandals",
    price: 168.0,
    image: "/src/assets/images/product-pearl-sandal.svg",
    isNew: true,
    salesCount: 156,
    description: "Delicately woven straps finished with a subtle pearlescent sheen, pairing everyday comfort with quiet, understated luxury.",
  },
  {
    id: 6,
    name: "Amber Silk",
    category: "Perfume",
    price: 104.0,
    image: "/src/assets/images/product-amber-silk.svg",
    isNew: true,
    salesCount: 289,
    description: "A cozy blend of amber and soft musk wrapped in silky sandalwood — warm, close to the skin, and quietly addictive.",
  },
];
