import { serve } from "bun";
import { app } from "../src/main";

serve({
  fetch: app.fetch,
  port: 3000,
});
