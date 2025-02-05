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
import materialRoutes from './src/routes/materials.route.js';
import dashboardRoutes from './src/routes/dashboard.route.js';
import AuthRoutes from './src/routes/auth.route.js';
import PaymentRoutes from './src/routes/payments.route.js';
const app = express();

// Configurar CORS
app.use(cors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRouter);
app.use('/clients', clientRoutes);
app.use('/employees', employeeRoutes);
app.use('/materials', materialRoutes);
app.use('/proposals', proposalRoutes);
app.use('/services', serviceRoutes);
app.use('/projects', projectsRouter);
app.use('/payments', PaymentRoutes);
app.use('/',AuthRoutes)
app.use('/notifications', notifications);
app.use('/dashboard',dashboardRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor en ' + PORT));