import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connection from './db.js';
import crudRoutes from './routes/crudRoutes.js';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;
dotenv.config();

// database connection
connection();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// routes
app.use("/api/cruds", crudRoutes);
//app.use("/api/auth", authRoute);

export default app;