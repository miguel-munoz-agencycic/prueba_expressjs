import express from "express";
const app = express();
import cors from "cors";
import { pool } from "./db.js";
import { PORT } from "./config.js";

app.use(cors());
app.use(express.json());

app.post("/create", async (req, res) => {
  const nombre = req.body.nombre
  const edad = req.body.edad
  const pais = req.body.pais
  const cargo = req.body.cargo
  const anios = req.body.anios

  const result = await pool.query("INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?,?,?,?,?)", [nombre, edad, pais, cargo, anios]);

  res.json(result)
});

app.get("/empleados", async (req, res) => {
  const [empleados] = await pool.query("SELECT * FROM empleados");

  res.json(empleados);
});

app.put("/update", async (req, res) => {
  const nombre = req.body.nombre
  const edad = req.body.edad
  const pais = req.body.pais
  const cargo = req.body.cargo
  const anios = req.body.anios
  const id_user = req.body.id

  const result = await pool.query("UPDATE empleados SET nombre = ?, edad = ?, pais = ?, cargo = ?, anios = ? WHERE id = ?", [nombre, edad, pais, cargo, anios, id_user]);

  res.send(result)
});

app.listen(PORT, () => {
  console.log("el puerto", PORT);
})