import { Hono } from "hono";
import { appMiddleware } from "../middleware/app";

const app = new Hono();

app.get("*", appMiddleware);

export default app;
