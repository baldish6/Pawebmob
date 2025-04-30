export const addImage = async (req,res,next) => {
    const newImage = new Image({ userId: req.user.id, ...req.body });
    try {
      const savedImage = await newImage.save();
      res.status(200).json(savedImage);
    } catch (err) {
      next(err);
    }
}

export const getImage = async (req,res,next) => {
    try {
        const image = await Image.findById(req.params.id);
        res.status(200).json(video);
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


export const sub = async (req, res, next) => {
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