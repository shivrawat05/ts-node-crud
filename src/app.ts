// src/app.ts
import express from "express";
import userRoutes from "./routes/userRoutes";
import { log } from "./utils/logger";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Node + TS + Redis + Postgres running!");
});

app.use((err: any, req: any, res: any, next: any) => {
  log(`Error: ${err.message}`);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
