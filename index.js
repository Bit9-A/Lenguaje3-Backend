import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import UserRouter from './src/routes/users.route.js';
import clientRoutes from './src/routes/clients.route.js';
import employeeRoutes from './src/routes/employee.route.js';
import proposalRoutes from './src/routes/proposal.route.js';
import serviceRoutes from './src/routes/services.route.js';
import projectsRouter from './src/routes/projects.route.js';
import notifications from './src/routes/notifications.route.js';

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:8000', // Reemplaza con la URL de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRouter);
app.use('/clients', clientRoutes);
app.use('/employees', employeeRoutes);
app.use('/proposal', proposalRoutes);
app.use('/services', serviceRoutes);
app.use('/projects', projectsRouter);
app.use('/notifications', notifications);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor en ' + PORT));