// This file sets up the Express server, configures middleware, loads routes, and starts the backend.

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const requests_1 = __importDefault(require("./routes/requests"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.json({ ok: true });
});
app.use("/auth", auth_1.default);
app.use("/requests", requests_1.default);
app.listen(PORT, () => {
    console.log(`Backend Express escuchando en http://localhost:${PORT}`);
});
