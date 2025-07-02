// pages/index.tsx
import React from "react";
import DiscordLogin from "../components/DiscordLogin";

const HomePage = () => {
	return (
		<div style={{ padding: "50px", textAlign: "center" }}>
			<h1>Welcome to My App</h1>
			<DiscordLogin />
		</div>
	);
};

export default HomePage;
