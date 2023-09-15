const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const movieSchema = new mongoose.Schema({
  country: {
    required: [true, 'Поле "country" должно быть заполнено'],
    type: String,
  },
  director: {
    required: [true, 'Поле "director" должно быть заполнено'],
    type: String,
  },
  duration: {
    required: [true, 'Поле "duration" должно быть заполнено'],
    type: Number,
  },
  year: {
    required: [true, 'Поле "year" должно быть заполнено'],
    type: String,
  },
  description: {
     required: [true, 'Поле "description" должно быть заполнено'],
    type: String,
  },
  image: {
     required: [true, 'Поле "image" должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
     required: [true, 'Поле "trailerLink" должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
     required: [true, 'Поле "thumbnail" должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
    nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },
}, { versionKey: false });


module.exports = mongoose.model('movie', movieSchema);
