const express = require('express')
const models = require('./models')
const app = express()
const mustacheExpress = require('mustache-express')
const { Op } = require ('sequelize')


app.engine('mustache', mustacheExpress('./views' + '/partials', '.mustache'))
   
app.set('views', './views')
   
app.set('view engine', 'mustache')


app.use(express.urlencoded())
 
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
//   }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/movies', (req, res) => {
    models.Movie.findAll({})
    .then(movies => {
        res.render('movies', {allMovies: movies})
    }).catch(error => console.log(error))
})

app.get('/movies/add-movie', (req, res) => {
    res.render('add-movie')
})

app.get('/movies/genre/:genre', (req, res) => {
    const genre = req.params.genre

    models.Movie.findAll({
        where: {
            genre: {
                [Op.iLike]: genre
            }
        }
    }).then(movie => {
        res.render('genres', {allMovies: movie})
    }).catch(error => {
        console.log(error)
    })
})

app.get('/movies/genre', (req, res) => {
    res.render('genres')
})

  app.post('/movies/add-movie', (req, res) => {
      const title = req.body.title
      const genre = req.body.genre
      const rating = req.body.rating
      const director = req.body.director

      const movie = models.Movie.build({
          title: title,
          genre: genre,
          rating: rating,
          director: director
      })

      movie.save().then(() => {
          res.redirect('/movies')
      }).catch(error => {
        console.log(error)
      })

  })

  app.get('/delete-movie/:movieId', (req, res) => {
      const movieId = req.params.movieId
      models.Movie.destroy({
          where: {
              id: movieId
          }
      }).then(() => {
          res.redirect('/movies')
      }).catch(error => console.log(error))
  })

  app.post('/update-movie', (req, res) => {
      const movieId = parseInt(req.body.movieId)
      const title = req.body.title
      const genre = req.body.genre
      const rating = parseInt(req.body.rating)

      models.Movies.update({
          title: title,
          genre: genre,
          rating: rating
      }, {
          where: {
              id: movieId
          }
      }).then(() => {
          res.redirect('/movies')
      }).catch(error => console.log(error))
  })

  app.get('/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId
    models.Movie.findByPk(movieId)
    .then(movie => {
        console.log(movie)
        res.render('movie-details', {movie: movie})
    }).catch(error => console.log(error)) 
})



  app.listen(3000, () => {
    console.log('Server is running...')
})