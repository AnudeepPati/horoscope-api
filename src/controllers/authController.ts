import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../database/connection";
import { User } from "../entities/User";
import { calculateZodiacSign } from "../utils/zodiacCalculator";
import { generateToken } from "../utils/jwt";

export class AuthController {
  private userRepo = AppDataSource.getRepository(User);

  async signup(req: Request, res: Response) {
    try {
      const { name, email, password, birthdate } = req.body;

      if (!name || !email || !password || !birthdate) {
        return res.status(400).json({ error: "All fields required" });
      }

      const existing = await this.userRepo.findOne({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const birthdateObj = new Date(birthdate);
      const zodiacSign = calculateZodiacSign(birthdateObj);

      const user = this.userRepo.create({
        name,
        email,
        password: hashedPassword,
        birthdate: birthdateObj,
        zodiacSign,
      });

      const savedUser = await this.userRepo.save(user);
      const token = generateToken({
        userId: savedUser.id,
        email: savedUser.email,
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          zodiacSign: savedUser.zodiacSign,
        },
        token,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken({ userId: user.id, email: user.email });

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          zodiacSign: user.zodiacSign,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
