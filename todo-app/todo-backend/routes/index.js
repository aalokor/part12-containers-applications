const express = require('express');
const router = express.Router();

const configs = require('../util/config');
const { getAsync } = require('../redis');

let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get('/statistics', async (req, res) => {
  let addedTodos = 0;

  if (getAsync) {
    try {
      const count = await getAsync('addedTodos');
      addedTodos = count ? parseInt(count) : 0;
    } catch (err) {
      console.error('Redis error:', err);
    }
  }

  res.json({
    added_todos: addedTodos,
  });
});

module.exports = router;
