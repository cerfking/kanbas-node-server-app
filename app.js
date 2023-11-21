import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
const app = express()
const allowedOrigins = process.env.FRONTEND_URL.split(',').map(origin=>origin);

app.use(express.json());
app.use(cors({
        credentials: true,
        origin: (origin, callback) => {
        allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'))
        },
        allowedHeaders: [
        'access-control-allow-origin',
        'authorization',
        'Pragma',
        'contact',
        ],
        exposeHeaders: []
    }
));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
app.use(
    session(sessionOptions)
);

UserRoutes(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app);
app.listen(process.env.PORT || 4000);