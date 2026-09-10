// ==========================
// SUPABASE CLIENT
// Single shared connection instance. If no valid .env credentials are
// present, this exports null instead of throwing — so the rest of the
// site (cart, dark mode, products, etc.) keeps working even before
// Supabase is connected. Only login/signup will be unavailable.
// ==========================

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("http");

if (!isConfigured) {
  console.warn(
    "Supabase is not configured yet (missing or placeholder .env values). " +
    "Login/signup will be disabled until real credentials are added — " +
    "see README.md. Everything else on the site will work normally."
  );
}

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;