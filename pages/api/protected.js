import { verifyToken } from "../../middleware/auth";

export default function handler(req, res) {
  verifyToken(req, res, () => {
    res.status(200).json({ message: "Access granted!", user: req.user });
  });
}
