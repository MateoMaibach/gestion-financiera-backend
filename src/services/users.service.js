import db from '../models/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

// Crear usuario
export const createUser = async (username, password) => {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const [result] = await db.query(
    'INSERT INTO usuarios (username, password) VALUES (?, ?)',
    [username, hashed]
  );
  return { id: result.insertId, username };
};

// Autenticación
export const authenticateUser = async (username, password) => {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
  if (rows.length === 0) return null;

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  // Generar token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '8h'
  });

  return { token, user: { id: user.id, username: user.username } };
};
