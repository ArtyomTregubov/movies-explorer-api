const Movie = require('../models/movie');
const NotFoundError404 = require('../errors/notFoundError404');
const ForbiddeError403 = require('../errors/forbiddeError403');

const getMovies = async (req, res, next) => {
    const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    if (!movies) { next(new NotFoundError404('Пользователь не найден')); return; }
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) { next(new NotFoundError404('Фильма не существует')); return; }
      if (movie.owner.toString() !== req.user._id) { next(new ForbiddeError403('Недостаточно прав')); return; }
      return Movie.deleteOne(movie).then(res.send({ message: `Фильм ${movieId} удалён` }));
    }).catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
