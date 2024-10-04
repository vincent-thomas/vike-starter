export { Counter };

import { useState } from "react";
import { styles } from "./styles.css";

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<button
			type="button"
			onClick={() => setCount((count) => count + 1)}
			className={styles}
		>
			Counter {count}
		</button>
	);
}
