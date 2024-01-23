import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import remarkImageLink from './src/plugins/remark-plugins/remark-image-links';
import { siteMetadata } from './src/data/siteMetadata';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), robotsTxt()],
  site: siteMetadata.siteUrl,
  markdown: {
    syntaxHighlight: 'prism',
    /**
     * Refer to: https://docs.astro.build/en/guides/markdown-content/#markdown-plugins
     * Applied to .md and .mdx files
     */
    remarkPlugins: [[remarkImageLink, { contentDirectory: siteMetadata.content.contentDirectory }]],
  },
});
