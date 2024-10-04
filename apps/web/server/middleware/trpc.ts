import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "@web/server";
import type { Handler } from "hono/types";

export const trpcMiddleware: Handler = trpcServer({
	router: appRouter,
});
