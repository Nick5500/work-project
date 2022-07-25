import Movie from '../models/movie.js';

class movieService {
  static getAllMovies() {
    try {
      return Movie.findAll()
    } catch (e) {
      console.log(e)
    }

  }

  static getOneMovie(id) {
    try {
      return Movie.findAll({
        where: { id }
      })
    } catch (e) {
      console.log(e)
    }
  }

  static createMovie(data) {
    try {
      const { name, time, rating } = data;

      return Movie.create({
        name,
        time,
        rating
      })
    } catch (e) {
      console.log(e)
    }
  }

  static updateMovie(movieId, data) {
    try{
      return Movie.update(data, {
        where: { id: movieId }
      })
    }catch (e) {
      console.log(e)
    }
  }

  static deleteMovie(movieId) {
    try{
      return Movie.destroy({ where: { id: movieId } })
    }catch (e) {
      console.log(e)
    }
  }
}

export default movieService;
