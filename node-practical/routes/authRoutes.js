import express from "express";
import { registerUser, loginUser, verifyEmail } from "../controllers/authController.js";
const router = express.Router();


router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);



export default router;