import { Request, Response } from "express";
import { AppDataSource } from "../database/connection";
import { User } from "../entities/User";
import { HoroscopeHistory } from "../entities/HoroscopeHistory";
import { generateHoroscope, ZODIAC_SIGN } from "../utils/horoscopeService";
import { MoreThan } from "typeorm";

interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

export class HoroscopeController {
  private userRepo = AppDataSource.getRepository(User);
  private historyRepo = AppDataSource.getRepository(HoroscopeHistory);

  async getTodayHoroscope(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let existing = await this.historyRepo.findOne({
        where: { userId, date: today },
      });

      let horoscopeText: string;

      if (existing) {
        horoscopeText = existing.horoscopeText;
      } else {
        horoscopeText = generateHoroscope(
          user.zodiacSign as ZODIAC_SIGN,
          today
        );

        const record = this.historyRepo.create({
          userId,
          zodiacSign: user.zodiacSign,
          horoscopeText,
          date: today,
        });

        await this.historyRepo.save(record);
      }

      res.json({
        date: today.toISOString().split("T")[0],
        zodiacSign: user.zodiacSign,
        horoscope: horoscopeText,
      });
    } catch (error) {
      console.error("Horoscope error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getHistory(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const history = await this.historyRepo.find({
        where: {
          userId,
          date: MoreThan(sevenDaysAgo),
        },
        order: { date: "DESC" },
      });

      const formattedHistory = history.map((h) => ({
        date: h.date.toISOString().split("T")[0],
        zodiacSign: h.zodiacSign,
        horoscope: h.horoscopeText,
      }));

      res.json({
        history: formattedHistory,
        totalRecords: formattedHistory.length,
      });
    } catch (error) {
      console.error("History error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
