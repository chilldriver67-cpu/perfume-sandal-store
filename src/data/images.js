// ==========================
// IMAGE URLS
// All product/content images live in Supabase Storage (bucket:
// product-images), so the client can swap them via the Supabase
// dashboard without any code change or redeploy.
//
// To replace an image: upload a file with the SAME filename to the
// bucket (overwriting the old one). No code change needed here.
// ==========================

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const BUCKET = "product-images";

// Builds a full public URL for a file in the storage bucket
export function imageUrl(filename) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename}`;
}