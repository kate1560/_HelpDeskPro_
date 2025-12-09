import { Router } from "express";
import { readDb } from "../db";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  const db = await readDb();
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  //  return ROLE
  return res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role  
  });
});

export default router;
