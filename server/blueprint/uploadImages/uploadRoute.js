import express from "express";
import multer from "multer";

const router = express.Router();

// Хранилище
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/img");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/img");
  },
  filename: (req, file, cb) => {
    const fileName = req.query.name;

    if (!fileName) {
      const tempFileName = new Date().getTime();
      cb(null, tempFileName + "." + file.originalname.split(".")[1]);
    } else {
      cb(null, fileName + "." + file.originalname.split(".")[1]);
    }
  },
});

// определение фильтра
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter }).single("image");

router.post("", upload, (req, res) => {
  let filedata = req.file;

  if (!filedata) {
    return res.status(400).json(apiError(400, "Ошибка при загрузке файла"));
  } else {
    return res.status(200).json({
      success: true,
      url: `/uploads/img/${filedata.filename}`,
    });
  }
});

// <form action="api/uploads?name=cat02" method="post" enctype="multipart/form-data">
//  <label>Файл</label><br>
//  <input type="file" name="image" /><br><br>
//  <input type="submit" value="Send" />
// </form>

export default router;
