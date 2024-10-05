import devServer from "@hono/vite-dev-server";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import type { UserConfig } from "vite";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: UserConfig = {
	plugins: [
		react(),
		devServer({
			entry: "./server/entries/index.ts",
			exclude: [
				/^\/@.+$/,
				/.*\.(ts|tsx|vue)($|\?)/,
				/.*\.(s?css|less)($|\?)/,
				/^\/favicon\.ico$/,
				/.*\.(svg|png)($|\?)/,
				/^\/(public|assets|static)\/.+/,
				/^\/node_modules\/.*/,
			],
			// Vike already does this
			injectClientScript: false,
		}),
		vike({}),
		vanillaExtractPlugin(),
	],
};

export default config;
