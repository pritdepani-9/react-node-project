import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.js";
import Verification from "../models/verification.js";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        const newUser = await User.create({ first_name, last_name, email, password_hash: hashedPassword });

        const otp = "123456";
        const expires_Time = new Date(Date.now() + 10000 * 60 * 5);

        await Verification.create({ user_id: newUser.id, verification_code: otp, expires_Time });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.is_verified) return res.status(400).json({ message: "User already verified" });

        const verification = await Verification.findOne({ where: { user_id: user.id } });

        if (!verification) return res.status(400).json({ message: "Verification code not found" });

        if (verification.verification_code !== otp) return res.status(400).json({ message: "Invalid OTP" });

        if (verification.expires_at < new Date()) return res.status(400).json({ message: "OTP expired" });

        await User.update({ is_verified: true }, { where: { id: user.id } });

        await Verification.destroy({ where: { user_id: user.id } });

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const response = {
            message: "Login successful",
            user_id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            is_verified: user.is_verified,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
