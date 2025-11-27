import multer from "multer";
import path from "path";

// Only allow images
const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + ext);
  },
});

function fileFilter(_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Only image files are allowed!"));
  } else {
    cb(null, true);
  }
}

export const upload = multer({ storage, fileFilter });
