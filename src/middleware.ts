import { defineMiddleware } from 'astro:middleware';

// Dok ne lansiramo: nijedna strana se ne indeksira. Ukloniti pri lansiranju (zajedno sa NOINDEX u Base.astro i robots.txt).
export const onRequest = defineMiddleware(async (_context, next) => {
  const odgovor = await next();
  odgovor.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return odgovor;
});
