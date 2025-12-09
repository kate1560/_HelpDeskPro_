"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");

const router = (0, express_1.Router)();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  const db = await (0, db_1.readDb)();

  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // return role 
  return res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  });
});

exports.default = router;
