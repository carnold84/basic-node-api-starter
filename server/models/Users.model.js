const { DataTypes, Sequelize } = require('sequelize');
const crypto = require('crypto');

const database = require('./database');

const createHash = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
};

// create user model
const User = database.define('user', {
  email: {
    type: DataTypes.STRING,
  },
  hash: {
    type: DataTypes.TEXT,
  },
  id: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
  },
  salt: {
    type: DataTypes.STRING(32),
  },
});

// create table with user model
User.sync()
  .then(() => console.log('User table created successfully'))
  .catch((err) =>
    console.log('oooh, did you enter wrong database credentials?')
  );

// create some helper functions to work on the database
User.createUser = async ({ email, name, password }) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = createHash(password, salt);
  const user = await User.create({ email, hash, name, salt });

  return user;
};

User.validatePassword = ({ user, password }) => {
  const hash = createHash(password, user.salt);
  return user.hash === hash;
};

User.getAllUsers = async () => {
  return await User.findAll();
};

User.getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

module.exports = User;
