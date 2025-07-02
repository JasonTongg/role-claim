// pages/api/auth/discord/callback.ts
import axios from "axios";

export default async function handler(req, res) {
	const code = req.query.code;

	const data = new URLSearchParams({
		client_id: process.env.DISCORD_CLIENT_ID,
		client_secret: process.env.DISCORD_CLIENT_SECRET,
		grant_type: "authorization_code",
		code,
		redirect_uri: "http://localhost:3000/api/auth/discord/callback",
		scope: "identify",
	});

	try {
		// Step 1: Exchange code for access token
		const tokenRes = await axios.post(
			"https://discord.com/api/oauth2/token",
			data,
			{
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
			}
		);

		const accessToken = tokenRes.data.access_token;

		// Step 2: Get user info using token
		const userRes = await axios.get("https://discord.com/api/users/@me", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		const discordUser = userRes.data;

		// ✅ You now have access to:
		// - discordUser.id (the userId)
		// - discordUser.username
		// - discordUser.avatar
		console.log("Discord User:", discordUser);
		const userJson = encodeURIComponent(JSON.stringify(discordUser));

		// Redirect or respond with user data
		res.redirect(`/success?user=${userJson}`);
	} catch (err) {
		console.error("OAuth error", err.response?.data || err.message);
		res.status(500).json({ error: "OAuth failed" });
	}
}
