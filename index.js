import 'dotenv/config'
import express from "express"
import UserRouter from './src/routes/users.route.js';
import clientRoutes from './src/routes/clients.route.js';
import employeeRoutes from './src/routes/employee.route.js'
import proposalRoutes from './src/routes/proposal.route.js'
import serviceRoutes from './src/routes/services.route.js';
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', UserRouter)
app.use('/clients', clientRoutes);
app.use('/employees', employeeRoutes);
app.use('/proposal', proposalRoutes);
app.use('/services', serviceRoutes);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor en '+ PORT));