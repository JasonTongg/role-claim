export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
    let { userId } = req.body;
    let token = process.env.DISCORD_BOT_TOKEN;
    if (!userId || !token) return res.status(400).json({ error: "Missing data" });

    let r = await fetch(
        `https://discord.com/api/v10/guilds/1333801644659314688/members/${userId}/roles/1348317416194576434`,
        { method: "PUT", headers: { Authorization: `Bot ${token}` } }
    );

    if (!r.ok) {
        let err = await r.json().catch(() => ({}));
        return res.status(r.status).json(err);
    }

    res.status(200).json({ success: true });
}
