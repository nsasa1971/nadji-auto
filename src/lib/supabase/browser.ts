import { createBrowserClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from 'astro:env/client';

/** Klijent za island komponente u pregledaču (samo anon ključ). */
export function napraviBrowserKlijent() {
  if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Nedostaju PUBLIC_SUPABASE_URL i PUBLIC_SUPABASE_ANON_KEY.');
  }
  return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}
