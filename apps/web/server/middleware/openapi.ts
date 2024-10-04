import type { Handler } from "hono/types";

import { generateOpenApi } from "@ts-rest/open-api";
import { apiContract } from "@web/api-contract";

export const openapiDocument: Handler = async () => {
	const openApiDocument = generateOpenApi(apiContract, {
		info: {
			title: "Testing",
			version: "v1",
		},
	});

	console.log(openApiDocument);

	return new Response(JSON.stringify(openApiDocument, undefined, 2));
};
