import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Aviso en desarrollo si faltan variables de entorno
  // No interrumpe la app, pero el cliente no funcionará hasta configurarlas
  console.warn("[Supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el entorno.");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

