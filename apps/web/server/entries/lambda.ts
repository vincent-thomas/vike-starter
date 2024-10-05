import app from ".";
import { handle } from "hono/aws-lambda";

export const handler = handle(app);
