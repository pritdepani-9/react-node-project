import express from "express";
import { booking } from "../controllers/bookingController.js";
const router = express.Router();



router.post('/create-booking', booking);

export default router;
