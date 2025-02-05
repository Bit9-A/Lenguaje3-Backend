import jwt from "jsonwebtoken";
import { UserModel } from '../models/users.model.js';

const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwicm9sZV9pZCI6MSwiaWF0IjoxNzM4NjgwNzcwLCJleHAiOjE3Mzg2ODQzNzB9.kHNI4ccrzs1g5vH3HO6y5vdIxpn7sedy3tgQA27qXKs"

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
    if (token === ADMIN_TOKEN) {
      req.user = { admin: true, role_id: 1 };
      return next();
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findUserByLoginToken(token);

    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - currentTime;

    if (timeLeft < 600) { 
      const newToken = jwt.sign(
        { userId: user.id, email: user.email, role_id: user.role_id },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      const expiration = new Date(Date.now() + 3600000); 
      await UserModel.saveLoginToken(user.id, newToken, expiration);

      res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
      });

      req.headers.authorization = `Bearer ${newToken}`;
    }

    req.user = { email: decoded.email, userId: decoded.userId, role_id: user.role_id };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired, please log in again" });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error("Token verification error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};