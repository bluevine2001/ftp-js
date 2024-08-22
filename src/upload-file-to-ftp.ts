import { Client } from "basic-ftp";
import fs from "fs/promises";

async function UploadFileToFTP(
  host: string,
  user: string,
  password: string,
  localFilePath: string,
  remoteFileName: string
) {
  const client = new Client();
  client.ftp.verbose = true; // Pour voir les logs dans la console
  try {
    await client.access({
      host,
      user,
      password,
      secure: false, // Passer à `true` si vous utilisez FTPS
    });

    // Téléchargement du fichier local vers le serveur FTP
    await client.uploadFrom(localFilePath, remoteFileName);
    console.log(
      `Fichier ${localFilePath} transféré avec succès en tant que ${remoteFileName}`
    );

    // Suppression du fichier local après le transfert
    await fs.unlink(localFilePath);
    console.log(`Fichier local ${localFilePath} supprimé avec succès.`);
  } catch (err) {
    console.error("Erreur lors du transfert FTP :", err);
    throw err; // Lancer l'erreur pour qu'elle soit gérée dans la route
  } finally {
    client.close();
  }
}

export default UploadFileToFTP;
