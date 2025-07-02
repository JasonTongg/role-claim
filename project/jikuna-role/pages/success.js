// pages/success.tsx
import { useRouter } from "next/router";
import React from "react";

const SuccessPage = () => {
	const router = useRouter();
	const { user } = router.query;

	let parsedUser = null;
	if (user && typeof user === "string") {
		try {
			parsedUser = JSON.parse(decodeURIComponent(user));
		} catch (err) {
			console.error("Failed to parse user:", err);
		}
	}

	return (
		<div style={{ padding: "20px", fontFamily: "Arial" }}>
			<h1>Discord Connected ✅</h1>
			<h1>Welcome, {parsedUser?.global_name}</h1>
			<p>
				Your Discord User ID: <strong>{parsedUser?.id}</strong>
			</p>
		</div>
	);
};

export default SuccessPage;
