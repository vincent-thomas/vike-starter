import { serve } from "@hono/node-server";
import app from "./dev";

serve({
	fetch: app.fetch,
	port: 8000,
});
