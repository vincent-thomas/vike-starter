import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

extendZodWithOpenApi(z);

const c = initContract();

const authenticationContract = c.router(
	{
		loginUser: {
			method: "POST",
			path: "/login",
			summary: "Login user",

			responses: {
				200: z.object({
					status: z.enum(["success"]),
					message: z.enum(["User logged in"]),
				}),
				400: z.object({
					status: z.enum(["error"]),
					error: z.enum(["Invalid credentials"]),
				}),
			},
			body: z.object({
				email: z.string(),
				password: z.string().min(10).max(50),
			}),
		},
		signupUser: {
			method: "POST",
			path: "/signup",
			summary: "Signs up a user",

			responses: {
				201: z.object({
					status: z.enum(["success"]),
					error: z.enum(["User created"]),
				}),
				400: z.object({
					status: z.enum(["error"]),
					error: z.enum(["User already exists"]),
				}),
			},
			body: z.object({
				email: z.string().email(),
				username: z.string(),
				password: z.string().min(10).max(50),
			}),
		},
	},
	{
		pathPrefix: "/auth",
	},
);

export const v1Contract = c.router(
	{
		authentication: authenticationContract,

		//getUser: {
		//	method: "GET",
		//	path: "/user",
		//	summary: "User",
		//
		//	responses: {
		//		200: z.object({
		//			status: z.enum(["success"]),
		//		}),
		//		400: z.object({
		//			status: z.enum(["error"]),
		//		}),
		//	},
		//},
	},
	{
		pathPrefix: "/v1",
		strictStatusCodes: true,
	},
);

//export const apiContract = c.router(
//	{
//		v1: v1Contract,
//	},
//	{
//		pathPrefix: "/api",
//		strictStatusCodes: true,
//	},
//);
