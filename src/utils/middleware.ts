import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt";
import rateLimit from "express-rate-limit";

interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

// TODO: can be changed as per the requirements
export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: { error: "Too many requests, try again later" },
});
