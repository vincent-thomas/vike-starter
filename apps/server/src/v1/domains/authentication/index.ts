import { v1Contract } from "@web/api-contract";
import { s } from "../../../utils/serverInit";

export const authenticationDomainRouter = s.router(v1Contract.authentication, {
	loginUser: async (tests) => {
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
});
