import express from "express";
import { addImage, deleteImage, updateImage, getImage,search,random,GetSub } from "../controllers/image.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { profilePost } from "../controllers/image.js";

const router = express.Router();

// create image
router.post('/add',verifyToken,addImage)

// get subscribed users images
router.get("/getSub",verifyToken, GetSub);

// get random images
router.get("/random", random);

// read image
router.get("/:id",getImage)

// update image
router.put("/:id",verifyToken,updateImage)

// delete image
router.delete("/:id",verifyToken,deleteImage)

// get images by search function
router.get("/search/:searchParam", search)

// get all posted images
router.get("/profile/:id", profilePost)
 

export default router;