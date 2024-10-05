// https://vike.dev/data
export { data };
export type Data = Awaited<ReturnType<typeof data>>;

// The node-fetch package (which only works on the server-side) can be used since
// this file always runs on the server-side, see https://vike.dev/data#server-side
import type { PageContextServer } from "vike/types";

const data = async (pageContext: PageContextServer) => {
	await sleep(300); // Simulate slow network

	return {
		test: "test",
		test2: "test2",
	};
};

function sleep(milliseconds: number) {
	return new Promise((r) => setTimeout(r, milliseconds));
}
