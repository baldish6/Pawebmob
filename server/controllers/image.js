import User from "../models/User.js";
import Image from "../models/Image.js";
import { createError } from "../error.js";
import { z } from "zod" 

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ImageFileSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
})

const SinglePostSchema = z.object({
  title:z.string()
  .min(1,"Title is required")
  .max(300,"Max 300 characters"), 
  desc:z.string().optional()
});

export const PostSchema = SinglePostSchema.merge(ImageFileSchema) ;


export const addImage = async (req,res,next) => {

  const result = PostSchema.safeParse(req.body);
    let zodErrors = {};
    if(!result.success){
        result.error.issues.forEach((issue)=>{
            zodErrors = {...zodErrors,[issue.path[0]]:issue.message};
        })}
     
    if(Object.keys(zodErrors).length>0){
        res.status(400).json({errors:zodErrors});
    } 
    else{
    const newImage = new Image({ userId: req.user.id, ...req.body });
    try {
      const savedImage = await newImage.save();
      res.status(200).json(savedImage);
      //res.status(200).json("Image created");
    } catch (err) {
      next(err);
    }
  }
}

export const getImage = async (req,res,next) => {
    try {
        const image = await Image.findById(req.params.id);
        res.status(200).json(image);
      } catch (err) {
        next(err);
      }
}
export const updateImage = async (req,res,next) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return next(createError(404, "Image not found!"));
        if (req.user.id === image.userId) {
          const updatedImage = await Image.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedImage);
        } else {
          return next(createError(403, "You can update only your video!"));
        }
      } catch (err) {
        next(err);
      }

}
export const deleteImage = async (req,res,next) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return next(createError(404, "Image not found!"));
        if (req.user.id === image.userId) {
          await Image.findByIdAndDelete(req.params.id);
          res.status(200).json("The image has been deleted.");
        } else {
          return next(createError(403, "You can delete only your images!"));
        }
      } catch (err) {
        next(err);
      }
}


export const GetSub = async (req, res, next) => {
 
    try {
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;
  
      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await Image.find({ userId: channelId });
        })
      );

      
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
    }
  };

  export const search = async (req, res, next) => {
    const query = req.params.searchParam;
    try {
      const images = await Image.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(images);
    } catch (err) {
      next(err);
    }
  };
  
  export const random = async (req, res, next) => {
    try {
      const images = await Image.aggregate([{ $sample: { size: 40 } }]);
      res.status(200).json(images);
    } catch (err) {
      next(err);
    }
  };

  export const profilePost = async (req,res,next)=>{
    try {
      const list = await Image.find({ userId: req.params.id });
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
    }
  }