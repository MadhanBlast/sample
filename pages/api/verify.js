import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Generate a JWT token valid for 24 hours
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "24h" });

    return res.status(200).json({ token });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
