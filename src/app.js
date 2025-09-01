import express from 'express';
import dotenv from 'dotenv';
import categoriasRoutes from './routes/categorias.routes.js'
import ingresosRoutes from './routes/ingresos.routes.js'
import egresosRoutes from './routes/egresos.routes.js'
import balanceRoutes from './routes/balance.routes.js'
import kpisRoutes from './routes/kpis.routes.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/categorias', categoriasRoutes);
app.use('/api/ingresos', ingresosRoutes);
app.use('/api/egresos', egresosRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/kpis', kpisRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend de Gestión Financiera funcionando 🚀');
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));