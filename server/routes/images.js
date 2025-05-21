import express from "express";
import { addImage, deleteImage, updateImage, getImage,sub,search,random } from "../controllers/image.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// create image
router.put("/",verifyToken,addImage)

// read image
router.get("/:id",verifyToken,getImage)

// update image
router.put("/:id",verifyToken,updateImage)

// delete image
router.delete("/:id",verifyToken,deleteImage)

// get subscribed users images
router.get("/sub",verifyToken, sub)

// get images by search function
router.get("/search", search)

// get random images
router.get("/random", random)
 

export default router;