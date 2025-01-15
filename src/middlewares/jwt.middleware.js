import jwt from "jsonwebtoken";
import { UserModel } from '../models/users.model.js';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findUserByLoginToken(token);

    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = { email: decoded.email, userId: decoded.userId };
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};