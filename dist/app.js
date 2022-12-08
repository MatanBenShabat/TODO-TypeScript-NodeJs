"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "200kb" }));
app.use("/todos", todos_1.default);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: "fail",
        message: err.message
    });
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server is runing on port ${port} in ${process.env.NODE_ENV}`);
});
