import express from "express";
import { register,login } from "../controllers/auth.js";

const router = express.Router();

// CREATE A USER
router.post('/register', register )

// LOGIN A USER
router.post("/login", login )

// GOOGLE AUTH
//router.post("/google", )

export default router;