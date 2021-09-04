const express = require('express');
const passport = require('passport');
const router = express.Router();

const Todos = require('../../models/Todos.model');

// get all todos
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const ids = req.query.ids;
  const exclude = req.query.exclude;
  const todos = await Todos.getTodosByUser(req.user.id, {exclude, ids});

  res.json(todos);
});

// get todo
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.user.id.toString();
  const { id } = req.params;
  const todo = await Todos.getTodo({ id, userId });
  res.json(todo);
});

// create todo
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const userId = req.user.id;
  const { done, text } = req.body;
  const todo = await Todos.createTodo({ done, text, userId });

  res.json({ todo, msg: 'Todo created successfully' });
});

// update todo
router.put('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const userId = req.user.id.toString();
  const todo = await Todos.updateTodo({ ...req.body, userId });

  res.json({ todo, msg: 'Todo updated successfully' });
});

// delete todo
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const userId = req.user.id.toString();
  const { id } = req.params;
  const todoId = await Todos.deleteTodo({ id, userId });

  res.json({ todoId, msg: 'Todo deleted successfully' })
});

module.exports = router;