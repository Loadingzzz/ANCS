import PostModel from "../models/Posts.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5);
    const tags = await posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags.split(","),
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Не удалось создать статью" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(404).json({
            message: "Не удалось получить статью",
          });
        }
        if (!doc) {
          res.status(404).json({ message: "Статья не найдена" });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Саться не найдена",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(404).json({
            message: "Не удалось удалить статью",
          });
        }
        if (!doc) {
          res.status(404).json({ message: "Статья не найдена" });
        }
        res.json({ succses: true });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Статья не удалена",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );
    res.json({ succses: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось обновить статью" });
  }
};
