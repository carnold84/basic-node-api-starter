const database = require('./database');
const Todo = require('./Todos.model');
const User = require('./Users.model');

database.sync()
  .then(() => console.log('Tables created successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = {
  Todos: Todo,
  Users: User,
};