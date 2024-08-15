import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Set dirname for ES Module Scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
export const uploads = multer({ storage }).array("files", 12);
