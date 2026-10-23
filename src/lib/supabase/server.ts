import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from 'astro:env/client';

/** Klijent po zahtevu (SSR), sa kolačićima sesije. */
export function napraviServerKlijent(request: Request, cookies: import('astro').AstroCookies) {
  if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Nedostaju PUBLIC_SUPABASE_URL i PUBLIC_SUPABASE_ANON_KEY.');
  }
  return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => parseCookieHeader(request.headers.get('Cookie') ?? '') as { name: string; value: string }[],
      setAll: (lista) => lista.forEach(({ name, value, options }) => cookies.set(name, value, options)),
    },
  });
}
