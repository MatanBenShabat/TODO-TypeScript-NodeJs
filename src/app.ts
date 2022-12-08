import express, { Request, Response, NextFunction } from "express";
import { json } from "stream/consumers";
import router from "./routes/todos";
require("dotenv").config();

import todosRouter from "./routes/todos";

const app = express();

app.use(express.json({ limit: "200kb" }));

app.use("/todos", todosRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).json({
        status: "fail",
        message: err.message
    })
    
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is runing on port ${port} in ${process.env.NODE_ENV}`);
});
