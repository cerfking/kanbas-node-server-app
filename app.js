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
app.use(cors({
        credentials: true,
        origin: process.env.NODE_ENV === 'production' ? ['http://a5--creative-unicorn-059316.netlify.app', 'http://a6--creative-unicorn-059316.netlify.app'] : "http://localhost:3000",
        preflightContinue: false,
    }
));
app.use(express.json());

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     sameSite: 'None', // or 'Lax' or 'Strict'
    //     secure: true,
    //     // Other cookie options if needed, such as secure: true for HTTPS
    // }
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