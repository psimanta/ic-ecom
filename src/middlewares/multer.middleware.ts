import multer from 'multer';

// user pc => fe => rest api => cloudinary
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname}`,
    );
  },
});

const parseWithMulter = multer({
  storage,
}).single('image');

export default parseWithMulter;
