import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.body;
  if (code !== process.env.ACCESS_CODE) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const groupId = 3529061;
    const roleId = 24274463;
    const response = await axios.get(`https://groups.roblox.com/v1/groups/${groupId}/roles/${roleId}/users?limit=100`);
    const users = response.data.data.map(user => ({
      username: user.username,
      displayName: user.displayName,
      date: user.updated || 'Tarih Yok'
    }));
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Veri alınamadı." });
  }
}
