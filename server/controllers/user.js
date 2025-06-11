import { createError } from "../error.js";
import User from "../models/User.js";
import Image from "../models/Image.js";
import Comment from "../models/Comment.js";

export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
}

export const updateUser = async (req,res,next)=>{
    if (req.params.id === req.user.id) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          next(err);
        }
      } else {
        return next(createError(403, "You can update only your account!"));
      }
}

export const deleteUser  = async (req,res,next)=>{
    if (req.params.id === req.user.id) {
        try {


          // delete all comments linked to this user images
          const records = await Image.find({  userId : req.params.id });
          for (let i = 0; i < records.length; i++) {  
            const img_id = records[i]._id;
            await Comment.deleteMany({
              imageId : img_id
              }).catch((error) => next(err))
        }

          // delete his posts
          await Image.deleteMany({
            userId : req.params.id
            }).catch((error) => next(err))

          // delete his comments
        await Comment.deleteMany({
          userId : req.params.id
          }).catch((error) => next(err))
          // delete user
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted.");
        } catch (err) {
          next(err);
        }
      } else {
        return next(createError(403, "You can delete only your account!"));
      }
}

export const subscribe =  async (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
          $push: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
          $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription successfull.")
      } catch (err) {
        next(err);
      }
}

export const unsubscribe = async  (req,res,next)=>{
    try {
        try {
          await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
          });
          await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
          });
          res.status(200).json("Unsubscription successfull.")
        } catch (err) {
          next(err);
        }
      } catch (err) {
        next(err);
      }
}

export const likeImage =   async (req,res,next)=>{
    const id = req.user.id;
    const imageId = req.params.imageId;
    try {
      await Image.findByIdAndUpdate(imageId,{
        $addToSet:{likes:id}
      })
      res.status(200).json("The image has been liked.")
    } catch (err) {
      next(err);
    }
}

export const dislikeImage =  async  (req,res,next)=>{
    const id = req.user.id;
    const imageId = req.params.imageId;
    try {
      await Image.findByIdAndUpdate(imageId,{
        $pull:{likes:id}
      })
      res.status(200).json("The image has been disliked.")
  } catch (err) {
    next(err);
  }
}

export const saveImage = async  (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
          $addToSet: { savedImages: req.params.imageId },
        });
        res.status(200).json("The image has been saved.")
      } catch (err) {
        next(err);
      }
}
 
export const removeSaveImage = async  (req,res,next)=>{
    try {
          await User.findByIdAndUpdate(req.user.id, {
            $pull: { savedImages: req.params.imageId },
          });
          res.status(200).json("The image has been removed from saved.")
      } catch (err) {
        next(err);
      }
}
