// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://blog-bagas.web.app',
	output: 'static',
	integrations: [mdx(), sitemap()]
});
