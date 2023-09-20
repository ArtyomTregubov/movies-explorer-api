const { celebrate, Joi } = require('celebrate');

const regExpUrl = require('./regExp');
//country, director, duration, year, description, image,
//   //         trailerLink, thumbnail, movieId, nameRU, nameEN, owner
const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExpUrl),
    trailerLink: Joi.string().required().pattern(regExpUrl),
    thumbnail: Joi.string().required().pattern(regExpUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    owner: Joi.string().length(24).hex().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  movieValidator,
  movieIdValidator,
};
