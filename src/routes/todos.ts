import { Router } from "express";

const router = Router();

import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todoController"

router.post("/", createTodo);
router.get("/", getTodos);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);


export default router;
