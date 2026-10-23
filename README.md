# Nađi auto

Besplatan oglasnik za prodaju automobila u Srbiji, povezan sa aplikacijom AutoLovac. Specifikacija je u `CLAUDE.md`.

## Tehnologija
Astro (server režim) + `@astrojs/cloudflare` (Workers), React island komponente, Supabase.

## Pokretanje
```sh
npm install
cp .env.example .env   # popuni vrednosti
npm run dev            # http://localhost:4321
npm run check          # tipovi
npm run build
```

## Promenljive okruženja
Vidi `.env.example`. `SITE_URL` je domen (nadjiauto.rs još nije potvrđen). Tajne samo u env promenljivama, nikad u kodu.

## Struktura
- `src/styles/tokens.css` — sve dizajn promenljive na jednom mestu
- `src/lib/baza.ts` — marke, modeli i generacije iz `src/data/baza.json`
- `src/lib/supabase/` — klijenti (server i pregledač)
- `src/islands/` — React komponente
- `public/hero/` — fotografija za hero (do tada tamna pozadina)

## Pre lansiranja
Sajt je `noindex`. Za lansiranje ukloniti `NOINDEX` u `src/layouts/Base.astro`, `src/middleware.ts` i `public/robots.txt`.

`referenca/` je samo vizuelna inspiracija; ništa odatle se ne kopira.
