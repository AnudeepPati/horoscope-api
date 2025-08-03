import jwt from 'jsonwebtoken';

// TODO: In production, use a long, random secret stored securely
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(payload: { userId: string; email: string }): string {
  return jwt.sign(
    payload, 
    JWT_SECRET, 
    { 
      expiresIn: '24h'
      // TODO: Consider shorter expiry (1-2 hours) with refresh tokens in production
    }
  );
}


export function verifyToken(token: string): { userId: string; email: string } {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch (error) {
    throw error;
  }
}