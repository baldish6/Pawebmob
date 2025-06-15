import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Image from "../models/Image.js";
import {  z } from "zod" 

const CommentSchema = z.object({
    desc:z.string()
    .min(1,"Comment is required")
    .max(10000,"Max 10000 characters"), 
   
});

export const addComment = async (req, res, next) => {

  const result = CommentSchema.safeParse(req.body);
    let zodErrors = {};
    if(!result.success){
        result.error.issues.forEach((issue)=>{
            zodErrors = {...zodErrors,[issue.path[0]]:issue.message};
        })}
     
    if(Object.keys(zodErrors).length>0){
        res.status(400).json({errors:zodErrors});
    } 
    else{
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
}
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    //const image = await Image.findById(res.params.id);
    if (req.user.id === comment.userId ){//|| req.user.id === image.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};


export const deletePostComment = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.imageId);
    if (!image) return next(createError(404, "Image not found!"));
    if (req.user.id === image.userId) {
      await Comment.deleteMany({
      imageId : req.params.imageId
      }).catch((error) => next(err))
      res.status(200).json("The comments of this post have been deleted.");
    }
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) return next(createError(404, "Comment not found!"));
      if (req.user.id === comment.userId ) {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
              $set: {desc:req.body.desc},
            }, 
            { new: true }
          );
          res.status(200).json(updatedComment);
      } else {
        return next(createError(403, "You can update only your comment!"));
      }
    } catch (err) {
      next(err);
    }
  };
  

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ imageId: req.params.imageId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
