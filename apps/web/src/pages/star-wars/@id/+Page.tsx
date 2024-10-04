import { useData } from "../../../../renderer/useData";
import type { Data } from "./+data";

export function Page() {
	const { test, test2 } = useData<Data>();

	return (
		<>
			<h1>{test}</h1>
			<br />
			Producer: {test2}
		</>
	);
}
