import 'dotenv/config'
import express from "express"
import UserRouter from './src/routes/user.route.js';
import clientRoutes from './src/routes/clients.route.js';
import employeeRoutes from './src/routes/employee.route.js'
import proposalRoutes from './src/routes/proposal.route.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/proposal', proposalRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor en '+ PORT));