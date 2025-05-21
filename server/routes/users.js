import express from "express";
import { 
    getUser,update,deleteUser,subscribe,unsubscribe,
    likeImage,dislikeImage,saveImage,removeSaveImage
 } from "../controllers/user.js";
 import { verifyToken } from "../verifyToken.js";


const router = express.Router();

// get user
router.get("/find/:id",getUser)

// update user
router.put("/:id",verifyToken,update)

// delete user
router.delete("/:id",verifyToken,deleteUser)

// subscribe
router.put("/sub/:id",verifyToken,subscribe)

// unsubscribe
router.put("/unsub/:id",verifyToken,unsubscribe)

// like image
router.put("/like/:ImageId",verifyToken,likeImage)

// dislike image
router.put("/dislike/:ImageId",verifyToken,dislikeImage)

// save image
router.put("/save/:id",verifyToken,saveImage)

// remove from saved image
router.put("/unsave/:id",verifyToken,removeSaveImage)

export default router;