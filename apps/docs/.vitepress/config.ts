import { defineConfig } from "vitepress";

export default defineConfig({
	lang: "en-US",
	title: "VitePress",
	description: "Vite & Vue powered static site generator.",
	outDir: "dist",
	srcDir: "docs",
	themeConfig: {
		search: {
			provider: "local",
		},
	},
});
