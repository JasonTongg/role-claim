// components/DiscordLogin.tsx
import React from "react";

const DiscordLogin = () => {
	const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
	const redirectUri = encodeURIComponent(
		"http://localhost:3000/api/auth/discord/callback"
	);
	const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;

	return (
		<a
			href={discordAuthUrl}
			style={{
				padding: "10px 20px",
				backgroundColor: "#5865F2",
				color: "#fff",
				borderRadius: "5px",
				textDecoration: "none",
				borderRadius: "30px",
			}}
		>
			Connect Discord
		</a>
	);
};

export default DiscordLogin;
