import { app } from "../src/main";
import { handle } from "hono/aws-lambda";

export const handler = handle(app);
