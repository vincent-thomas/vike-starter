import { v1Contract } from "@web/api-contract";
import { s } from "../utils/serverInit";
import { authenticationDomainRouter } from "./domains/authentication";

export const v1Server = s.router(v1Contract, {
	authentication: authenticationDomainRouter,
});
