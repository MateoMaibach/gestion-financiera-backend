import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secretito";

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // validar
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Faltan campos" });
    }

    // verificar si ya existe
    const userExist = await Usuario.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // crear usuario
    const newUser = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Usuario creado", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscar usuario
    const user = await Usuario.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // comparar password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    // generar token
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email },
      JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el login", error });
  }
};
