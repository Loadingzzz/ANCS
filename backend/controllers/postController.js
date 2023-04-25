import PostModel from "../models/Posts.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postID = req.params.id;

    const post = await new PostModel.findById(postID);

    // PostModel.findByIdAndRemove(
    //   {
    //     _id: postID,
    //   },
    //   {
    //     $inc: { viewsCount: 1 },
    //   },
    //   {
    //     returnDocument: "after",
    //   }
    // );
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить ДАННУЮ СТАТЬЮ" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Не удалось создать статью" });
  }
};

// ,
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({ message: "Не удалось вернуть статью" });
//         }

//         if (!doc) {
//           return res.status(404).json({
//             message: "Статья не найдена",
//           });
//         }

//         res.json(doc);
//       }
