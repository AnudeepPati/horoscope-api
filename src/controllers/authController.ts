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
        return res.status(400).json({
          error:
            "Missing required fields. Please provide name, email, password, and birthdate.",
        });
      }

      const existingUser = await this.userRepo.findOne({ where: { email } });

      if (existingUser) {
        return res.status(409).json({
          error:
            "This email is already registered. Please use a different one or login instead.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const birthDateObj = new Date(birthdate);

      if (isNaN(birthDateObj.getTime())) {
        return res.status(400).json({
          error:
            "Invalid birthdate format. Please use a valid date string (e.g., YYYY-MM-DD).",
        });
      }

      const zodiacSign = calculateZodiacSign(birthDateObj);

      const newUser = this.userRepo.create({
        name,
        email,
        password: hashedPassword,
        birthdate: birthDateObj,
        zodiacSign,
      });

      const savedUser = await this.userRepo.save(newUser);
      const token = generateToken({
        userId: savedUser.id,
        email: savedUser.email,
      });

      return res.status(201).json({
        message: "Signup successful! Welcome aboard.",
        data: {
          user: {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            zodiacSign: savedUser.zodiacSign,
          },
          token,
        },
      });
    } catch (error) {
      console.error("Signup Error:", error);
      return res.status(500).json({
        error:
          "Something went wrong while creating the account. Please try again later.",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Please provide both email and password.",
        });
      }

      const user = await this.userRepo.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          error: "No account found with this email. Please sign up first.",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          error: "Incorrect password. Please double-check and try again.",
        });
      }

      const token = generateToken({ userId: user.id, email: user.email });

      return res.status(200).json({
        message: "Login successful!",
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            zodiacSign: user.zodiacSign,
          },
          token,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({
        error: "Something went wrong during login. Please try again later.",
      });
    }
  }
}
