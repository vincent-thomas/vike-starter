import { v1Contract } from "@web/api-contract";
import { v1Server } from "./router";
import { createVersionInstancer } from "../utils/createVersionInstance";

const v1Instance = createVersionInstancer(v1Contract, v1Server);
export { v1Instance };
