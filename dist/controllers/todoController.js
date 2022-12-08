"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todoModel_1 = require("../models/todoModel");
let TODOS = [];
const createTodo = (req, res, next) => {
    if (!req.body.text) {
        res.status(400).json({
            status: "failed",
            message: "Your are missing required field",
        });
        return next();
    }
    const text = req.body.text;
    const newTodo = new todoModel_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({
        data: TODOS,
        message: "success",
    });
    next();
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(200).json({
        data: TODOS,
    });
};
exports.getTodos = getTodos;
// export const updateTodo: RequestHandler = (req, res, next) => {
//   const text: string = req.body.text;
//   const todoId: string = req.params.id;
//   if (!text || !todoId)
//     return res.json({ status: "fail", mesaage: "You are missing id/text" });
//   let [updatedTodo] = TODOS.filter((todo) => todo.id === todoId);
//   updatedTodo.text = text;
//   res.status(201).json({
//     message: "success",
//     data: {
//       TODOS,
//     },
//   });
// };
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const text = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    TODOS[todoIndex] = new todoModel_1.Todo(TODOS[todoIndex].id, text);
    res.status(200).json({ TODOS });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    if (!todoId)
        return res.json({ status: "fail", mesaage: "You are missing id" });
    TODOS = TODOS.filter((todo) => todo.id !== todoId);
    res.status(200).json({
        status: "success",
        data: {
            TODOS,
        },
    });
};
exports.deleteTodo = deleteTodo;
