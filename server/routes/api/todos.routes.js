const express = require('express');
const passport = require('passport');
const router = express.Router();

const Todos = require('../../models/Todos.model');

// get all todos
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const ids = req.query.ids;
    const exclude = req.query.exclude;
    const todos = await Todos.getTodosByUser(req.user.id, { exclude, ids });

    res.status(200).json(todos);
  }
);

// get todo
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userId = req.user.id.toString();
    const { id } = req.params;
    const todo = await Todos.getTodo({ id, userId });

    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).send('404 - Not found');
    }
  }
);

// create todo
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    if (req.body.id) {
      res
        .status(400)
        .send(
          `Bad request: ID should not be provided, since it is determined automatically by the database.`
        );
    } else {
      const userId = req.user.id;
      const { done, text } = req.body;
      const todo = await Todos.createTodo({ done, text, userId });

      // return the new job
      res.status(201).json(todo);
    }
  }
);

// update todo
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const userId = req.user.id.toString();
    const id = req.params.id;

    // We only accept an UPDATE request if the `:id` param matches the body `id`
    if (req.body.id === id) {
      const todo = await Todos.updateTodo({ ...req.body, userId });

      res.status(200).json(todo);
    } else {
      res
        .status(400)
        .send(
          `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
        );
    }
  }
);

// delete todo
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const userId = req.user.id.toString();
    const { id } = req.params;
    const todo = await Todos.deleteTodo({ id, userId });

    res.status(200).json(todo);
  }
);

module.exports = router;
