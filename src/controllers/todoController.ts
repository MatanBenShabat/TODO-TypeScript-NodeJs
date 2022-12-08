import { RequestHandler } from "express";
import { Todo } from "../models/todoModel";

let TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  if (!req.body.text) {
    res.status(400).json({
      status: "failed",
      message: "Your are missing required field",
    });
    return next();
  }
  const text: string = req.body.text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({
    data: TODOS,
    message: "success",
  });

  next();
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({
    data: TODOS,
  });
};

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

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId: string = req.params.id;
  const text: string = req.body.text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, text)

  res.status(200).json({TODOS})
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId: string = req.params.id;
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
