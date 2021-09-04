const express = require('express');
const router = express.Router();

router.use('/todos', require('./todos.routes'));
router.use('/users', require('./users.routes'));

module.exports = router;