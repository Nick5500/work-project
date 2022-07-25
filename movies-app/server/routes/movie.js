import MovieController from '../controllers/movie.js'
import Router from 'express'
const router = new Router()

router.post('/movie', MovieController.createMovie)
router.put('/movie/:id', MovieController.updateMovie)
router.delete('/movie/:id', MovieController.deleteMovie)
router.get('/movie/:id', MovieController.getMovieById)
router.get('/movies', MovieController.getAllMovies)

export default router;
