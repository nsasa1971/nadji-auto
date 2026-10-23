import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ imageService: 'passthrough' }),
  // Prijava ide preko Supabase kolačića, Astro sesije (KV) ne trebaju.
  session: false,
  integrations: [react()],
  env: {
    schema: {
      // Domen nadjiauto.rs još nije potvrđen, zato je u promenljivoj.
      SITE_URL: envField.string({ context: 'server', access: 'public', default: 'https://nadjiauto.rs' }),
      PUBLIC_SUPABASE_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_SUPABASE_ANON_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      SUPABASE_SERVICE_ROLE_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
