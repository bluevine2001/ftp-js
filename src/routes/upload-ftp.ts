import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import UploadFileToFTP from "../upload-file-to-ftp";
const router: Router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Chemin vers le répertoire temporaire
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Conserver l'extension du fichier
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Nom personnalisé
  },
});

const upload = multer({ storage });

router.post(
  "/upload-ftp",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { host, user, password, remoteFileName } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }
    const localFilePath = path.resolve(req.file.path);
    console.log({ host, user, password, localFilePath, remoteFileName });

    try {
      await UploadFileToFTP(
        host,
        user,
        password,
        localFilePath,
        remoteFileName
      );
      res.json({ message: "Here is the upload route !" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occured" });
    }
  }
);

export default router;
