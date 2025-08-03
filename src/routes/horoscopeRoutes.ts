import { Router } from "express";
import { HoroscopeController } from "../controllers/horoscopeController";
import { authenticateToken, rateLimiter } from "../utils/middleware";

const router = Router();
const horoscopeController = new HoroscopeController();

router.use(rateLimiter);

router.get("/today", authenticateToken, (req, res) =>
  horoscopeController.getTodayHoroscope(req, res)
);

router.get("/history", authenticateToken, (req, res) =>
  horoscopeController.getHistory(req, res)
);

export default router;
