const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError404 = require('../errors/notFoundError404');
const ConflictError409 = require('../errors/conflictError409');
const UnauthorizedError401 = require('../errors/unauthorizedError401');

const { NODE_ENV, JWT_SECRET } = process.env;
const createUser = async (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError409(
            `Пользователь с email '${email}' уже существует.`,
          ));
          return;
        }
        next(err);
      }));
};

const getProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 604800 }).send({ token });
    })
    .catch(() => next(new UnauthorizedError401('Необходима авторизация')));
};

const updateProfileInfo = async (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(next);
};


const unknownLink = () => {
  throw new NotFoundError404('Некорректный путь');
};

module.exports = {
  createUser,
  updateProfileInfo,
  unknownLink,
  getProfile,
  login,
};
