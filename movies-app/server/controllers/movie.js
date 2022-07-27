import movieService from '../service/movie.js';
import Util from '../util/Utils.js';

const util = new Util();

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await movieService.getAllMovies();

      if (!movies) {
        util.setError(404, 'Movies not found');
      } else {
        util.setSuccess(200, 'Movies found', movies);
      }

      return util.send(res);
    } catch (e) {
      util.setError(500, e);
      return util.send(res);
    }
  }

  static async getMovieById(req, res) {
    try {
      const oneMovie = await movieService.getOneMovie(req.params.id);

      if (!oneMovie) {
        util.setError(404, 'Movie not found');
      } else {
        util.setSuccess(200, 'The movie found', oneMovie);
      }

      return util.send(res);
    } catch (e) {
      util.setError(500, e);
      return util.send(res)
    }
  }

  static async createMovie(req, res) {
    try {
      const createdMovie = await movieService.createMovie(req.body);

      if (!createdMovie) {
        util.setError(400, 'Movie hasn\'t been created');
      } else {
        util.setSuccess(201, 'Movie has been created', createdMovie);
      }

      return util.send(res);
    } catch (e) {
      util.setError(500, e);
      return util.send(res)
    }
  }

  static async updateMovie(req, res) {
    try {
      const updatedMovie = await movieService.updateMovie(req.params.id, req.body);

      if (!updatedMovie) {
        util.setError(400, 'Movie hasn\'t been updated');
      } else {
        util.setSuccess(201, 'Movie has been updated');
      }

      return util.send(res);
    } catch (e) {
      util.setError(500, e);
      return util.send(res);
    }
  }

  static async deleteMovie(req, res) {
    try {
      const deletedMovie = await movieService.deleteMovie(req.params.id);

      if (!deletedMovie) {
        util.setError(400, 'Movie hasn\'t been deleted');
      } else {
        util.setSuccess(200, 'Movie has been deleted');
      }

      return util.send(res);
    } catch (e) {
      util.setError(500, e);
      return util.send(res);
    }
  }
}


export default MovieController;
