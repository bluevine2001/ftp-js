import express, { Application } from "express";
import routes from "./routes";

const app: Application = express();

// Middleware pour parser les données JSON
app.use(express.json());

// Définir vos routes
app.use("/api", routes);

export default app;
