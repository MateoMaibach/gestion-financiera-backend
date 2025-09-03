import { createUser, authenticateUser } from '../services/users.service.js';

// Registrar usuario
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authenticateUser(username, password);
    if (!result) return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};
