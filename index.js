import 'dotenv/config'
import express from "express"
import UserRouter from './routes/user.route.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/v1/users', UserRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor en '+ PORT));