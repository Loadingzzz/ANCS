export const upload = (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Не удалось получить изображение" });
  }
};
