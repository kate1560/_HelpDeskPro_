// Main Express server setup with middleware, routes, and server startup.

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import requestsRoutes from "./routes/requests";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);
app.use("/requests", requestsRoutes);

app.listen(PORT, () => {
  console.log(`Backend Express escuchando en http://localhost:${PORT}`);
});
