import { Router } from "express";
import { readDb, writeDb, RequestItem, CommentItem } from "../db";

const router = Router();

// GET /requests?userEmail=...
router.get("/", async (req, res) => {
  const userEmail = req.query.userEmail as string | undefined;
  const db = await readDb();

  const list = userEmail
    ? db.requests.filter((r) => r.userEmail === userEmail)
    : db.requests;

  res.json(list);
});

// GET /requests/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const db = await readDb();

  const request = db.requests.find((r) => r.id === id);

  if (!request) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  // Ensure that there is always an array of comments
  request.comments = request.comments ?? [];

  res.json(request);
});

// POST /requests
router.post("/", async (req, res) => {
  const { title, description, userEmail } = req.body as {
    title?: string;
    description?: string;
    userEmail?: string;
  };

  if (!title || !userEmail) {
    return res.status(400).json({ error: "title y userEmail son requeridos" });
  }

  const db = await readDb();
  const now = new Date().toISOString();

  const newRequest: RequestItem = {
    id: Date.now().toString(),
    title,
    description,
    status: "pending",
    createdAt: now,
    updatedAt: now,
    userEmail,
    comments: [], 
  };

  db.requests.push(newRequest);
  await writeDb(db);

  res.status(201).json(newRequest);
});

// PATCH /requests/:id
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body as Partial<RequestItem>;

  const db = await readDb();
  const idx = db.requests.findIndex((r) => r.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  const existing = db.requests[idx];
  const updated: RequestItem = {
    ...existing,
    title: title ?? existing.title,
    description: description ?? existing.description,
    status: status ?? existing.status,
    updatedAt: new Date().toISOString(),
  };

  db.requests[idx] = updated;
  await writeDb(db);

  res.json(updated);
});

// DELETE /requests/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const db = await readDb();
  const idx = db.requests.findIndex((r) => r.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  db.requests.splice(idx, 1);
  await writeDb(db);

  res.json({ ok: true });
});

// NEW: ADD COMMENTS TO A REQUEST
// POST /requests/:id/comments
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body as {
    author?: string;
    text?: string;
  };

  if (!author || !text) {
    return res.status(400).json({ error: "author y text son requeridos" });
  }

  const db = await readDb();
  const request = db.requests.find((r) => r.id === id);

  if (!request) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  request.comments = request.comments ?? [];

  const newComment: CommentItem = {
    id: Date.now().toString(),
    author,
    text,
    timestamp: new Date().toISOString(),
  };

  request.comments.push(newComment);

  await writeDb(db);

  res.status(201).json(newComment);
});

export default router;
