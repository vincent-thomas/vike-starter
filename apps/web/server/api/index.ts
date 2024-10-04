import { apiContract } from "@web/api-contract";
import { initServer } from "ts-rest-hono";

const s = initServer();

export const server = s.router(apiContract, {
	v1: {
		authentication: {
			loginUser: async (tests) => {
				console.log(tests);

				return {
					body: {
						status: "success",
						message: "User logged in",
					},
					status: 200,
				};
			},
			signupUser: async (test) => ({
				body: {
					status: "success",
					error: "User created",
				},
				status: 201,
			}),
		},
		getUser: () => {
			return {
				status: 400,
				body: {
					status: "error",
				},
			};
		},
	},
});
