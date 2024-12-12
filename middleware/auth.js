const jwt = require('jsonwebtoken');
// or if using ES modules
import jwt from 'jsonwebtoken';


const SECRET_KEY = "secret_key";

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach decoded data to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token expired or invalid" });
  }
}
