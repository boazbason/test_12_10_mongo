import express from 'express';
import userRouter from './routes/UserRoutes.js';
import connectDb from './config/db.js';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger.js';

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : 3000;
const app = express();
app.use(cookieParser())
connectDb();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/students', userRouter);


app.listen(PORT, () => { console.log("serevr listen to " + PORT) })