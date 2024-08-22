import { Request, Response, Router } from "express";
import uploadFtpRoute from "./upload-ftp";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from the API!" });
});

router.use(uploadFtpRoute);
export default router;
