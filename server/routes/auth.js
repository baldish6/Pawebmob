import express from "express";
import { register,login,logout } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// CREATE A USER
router.post('/register', register )

// LOGIN A USER
router.post("/login", login )

// LOGOUT USER
router.get("/logout", verifyToken, logout )

export default router;