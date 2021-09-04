const express = require('express');
const router = express.Router();

const PATH = process.env.APP_PATH ? `/${process.env.APP_PATH}` : '';

router.use(`${PATH}/api`, require('./api'));

module.exports = router;