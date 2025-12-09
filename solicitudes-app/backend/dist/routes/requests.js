"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
// GET /requests?userEmail=...
router.get("/", async (req, res) => {
    const userEmail = req.query.userEmail;
    const db = await (0, db_1.readDb)();
    const list = userEmail
        ? db.requests.filter((r) => r.userEmail === userEmail)
        : db.requests;
    res.json(list);
});
// GET /requests/:id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const db = await (0, db_1.readDb)();
    const request = db.requests.find((r) => r.id === id);
    if (!request) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
    }
    res.json(request);
});
// POST /requests
router.post("/", async (req, res) => {
    const { title, description, userEmail } = req.body;
    if (!title || !userEmail) {
        return res.status(400).json({ error: "title y userEmail son requeridos" });
    }
    const db = await (0, db_1.readDb)();
    const now = new Date().toISOString();
    const newRequest = {
        id: Date.now().toString(),
        title,
        description,
        status: "pending",
        createdAt: now,
        updatedAt: now,
        userEmail,
    };
    db.requests.push(newRequest);
    await (0, db_1.writeDb)(db);
    res.status(201).json(newRequest);
});
// PATCH /requests/:id
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const db = await (0, db_1.readDb)();
    const idx = db.requests.findIndex((r) => r.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
    }
    const existing = db.requests[idx];
    const updated = {
        ...existing,
        title: title ?? existing.title,
        description: description ?? existing.description,
        status: status ?? existing.status,
        updatedAt: new Date().toISOString(),
    };
    db.requests[idx] = updated;
    await (0, db_1.writeDb)(db);
    res.json(updated);
});
// DELETE /requests/:id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const db = await (0, db_1.readDb)();
    const idx = db.requests.findIndex((r) => r.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
    }
    db.requests.splice(idx, 1);
    await (0, db_1.writeDb)(db);
    res.json({ ok: true });
});
exports.default = router;
