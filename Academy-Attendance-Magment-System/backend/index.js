
// server setup
import express from "express";
import { dbConnect } from "./db/index.js";
import cors from "cors";
import bodyParser from 'body-parser'

const app = express();

// DB connection ensure
const port = process.env.PORT || 8000;

dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("DB connection error in route file:", err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Middleware to parse JSON request bodies

//import userrouter

import userRouter from "./userRoutes/routes.js"

app.use("/api/v1/users", userRouter);
