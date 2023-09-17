import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  output: "hybrid",
  vite: {
    ssr: {
      noExternal: ["styled-components"],
    },
  },
  adapter: netlify({ edgeMiddleware: true }),
});
