import express from "express";
import { addComment, deleteComment, getComments,updateComment } from "../controllers/comment.js";
import {verifyToken} from "../verifyToken.js"
const router = express.Router();

router.post("/", verifyToken, addComment)
router.get("/:videoId", getComments)
router.put("/:id",verifyToken,updateComment)
router.delete("/:id", verifyToken, deleteComment)

export default router;
