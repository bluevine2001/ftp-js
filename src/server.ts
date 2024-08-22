import fs from "fs";
import path from "path";
import app from "./app";

// Chemin du répertoire uploads
const uploadDir = path.resolve(__dirname, "../uploads");

// Vérifier si le répertoire 'uploads' existe, sinon le créer
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
