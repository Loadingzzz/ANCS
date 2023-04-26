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
    const postId = req.params.id;

    const post = await PostModel.findById({ _id: postId })
      .populate("user")
      .exec();
    res.json(post);
    console.log(post);
  } catch (err) {
    console.log(err);
    res.status(505).json({ message: "Не получилось получить доступ к статье" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          res.status(404).json({ message: "не удалось удалить" });
        }
        if (!doc) {
          res.status(404).json({ message: "не удалось удалить" });
        }
        res.json({ succses: true });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(505).json({ message: "Не удалось удалить статью" });
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

// try {
//   const postId = req.params.id;
//   PostModel.findByIdAndUpdate(
//     { _id: postId },
//     {
//       $inc: { viewsCount: 1 },
//     },
//     { returnDocument: "after" },
//     (err, doc) => {
//       if (err) {
//         console.log(err);
//         return res.json({ message: "Не удалось получить одну статью" });
//       }
//       if (!doc) {
//         console.log(doc);
//         return res.json({ message: "Не удалось получить одну статью" });
//       }
//       res.json(doc);
//     }
//   );
// } catch (err) {
//   console.log(err);
//   res.status(500).json({ message: "Не удалось получить ДАННУЮ СТАТЬЮ" });
// }
// };
