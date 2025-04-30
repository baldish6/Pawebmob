import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Image from "../models/Image.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const image = await Image.findById(res.params.id);
    if (req.user.id === comment.userId || req.user.id === image.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(res.params.id);
      const image = await Image.findById(res.params.id);
      if (req.user.id === comment.userId || req.user.id === image.userId) {
        const updatedComment = await Comment.findByIdAndUpdate(
            res.params.id,
            {
              $set: req.body,
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
