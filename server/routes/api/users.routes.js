const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

const Users = require('../../models/Users.model');
const jwtOptions = require('../../config/jwtOptions');

// get all users
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Users.getAllUsers().then((user) => res.json(user));
  }
);

// get all users
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    const { id } = req.params;

    Users.getUser({ id }).then((user) => {
      // delete sensitive data
      delete user.dataValues.hash;
      delete user.dataValues.salt;

      res.status(200).json(user);
    });
  }
);

// register route
router.post('/register', async (req, res, next) => {
  const { email, name, password } = req.body;
  const user = await Users.createUser({ email, name, password });

  res.status(201).json({ email: user.email, name: user.name });
});

//login route
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
    let user = await Users.getUser({ email });

    if (user && Users.validatePassword({ user, password })) {
      // from now on we'll identify the user by the id and the id is the
      // only personalized value that goes into our token
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.status(200).json({ id: user.id, token });
    } else {
      res.status(401).json({ msg: 'Email or password is incorrect' });
    }
  }
});

module.exports = router;
