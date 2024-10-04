import { createHonoEndpoints, RecursiveRouterObj } from "ts-rest-hono";
import { Hono } from "hono";
import { generateOpenApi } from "@ts-rest/open-api";

export function createVersionInstancer(
	contract: any,
	server: RecursiveRouterObj<any, any>,
) {
	const hono = new Hono();

	createHonoEndpoints(contract, server, hono, {
		requestValidationErrorHandler: ({ body }) => {
			return {
				status: 400,
				error: { error: "CLIENT_ERROR", message: body?.issues },
			};
		},
		responseValidation: true,
		responseValidationErrorHandler: () => ({
			status: 500,
			error: "INTERNAL_SERVER_ERROR: Response schema not met internally",
		}),
	});

	const openApiDocument = generateOpenApi(contract, {
		info: {
			title: "Testing",
			version: "v1",
		},
	});

	hono.get("/openapi", () => {
		return new Response(JSON.stringify(openApiDocument, undefined, 2));
	});

	return hono;
}
