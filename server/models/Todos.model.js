const { DataTypes, Sequelize } = require('sequelize');

const database = require('./database');

const Op = Sequelize.Op;

// create todo model
const Todo = database.define('todo', {
  done: {
    type: DataTypes.BOOLEAN,
  },
  id: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  text: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.UUID,
  },
});

// create table with todo model
Todo.sync()
  .then(() => console.log('Todo table created successfully'))
  .catch((err) =>
    console.log('oooh, did you enter wrong database credentials?')
  );

Todo.createTodo = async ({ done, text, userId }) => {
  const todo = await Todo.create({
    done,
    text,
    userId,
  });

  return todo;
};

Todo.updateTodo = async ({ id, userId, ...rest }) => {
  await Todo.update(
    { ...rest },
    {
      where: { id, userId },
    }
  );
  const Todos = await Todo.findAll({
    where: {
      userId,
      id: {
        [Op.in]: [id],
      },
    },
  });

  return Todos[0];
};

Todo.getTodosByUser = async (userId, { exclude, ids }) => {
  let whereStatement = {
    userId,
  };

  if (exclude) {
    whereStatement.id = {
      [Op.notIn]: exclude,
    };
  }

  if (ids) {
    whereStatement.id = {
      [Op.in]: ids,
    };
  }

  return await Todo.findAll({
    where: whereStatement,
  });
};

Todo.getAllTodos = async () => {
  return await Todo.findAll();
};

Todo.getTodo = async ({ id, userId }) => {
  return await Todo.findOne({
    where: { id, userId },
  });
};

Todo.deleteTodo = async ({ id, userId }) => {
  const todo = await Todo.findOne({
    where: { id, userId },
  });
  await Todo.destroy({
    where: { id, userId },
  });

  return todo;
};

module.exports = Todo;
