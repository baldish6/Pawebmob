import express from "express";
import { addComment, deleteComment, getComments,updateComment,deletePostComment } from "../controllers/comment.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();


router.post("/", verifyToken, addComment)
router.get("/:imageId", getComments)
router.put("/:id",verifyToken,updateComment)
router.delete("/:id", verifyToken, deleteComment)
router.delete("/imgdl/:imageId", verifyToken, deletePostComment)


export default router;
