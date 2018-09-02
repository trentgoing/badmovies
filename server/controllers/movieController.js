const movieModel = require('../models/movieModel.js').Movie;
const apiHelpers = require('../helpers/apiHelpers.js');
const axios = require('axios');
const config = require('../../config.js');

//Return requests to the client
module.exports = {

  getSearch: (req, res) => {
    console.log(req.query.genre_id);
    axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: config.API_KEY,
        language: 'en-US',
        sort_by: 'popularity.asc',
        include_adult: 'false',
        include_video: 'false',
        page: 1,
        with_genres: req.query.genre_id || 28
      }
    })
    .then(({data}) => {
      res.send(data.results);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  },


  getGenres: (req, res) => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: config.API_KEY,
        language: 'en-US',
      }
    })
    .then(({data}) => {
      res.send(data.genres);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  },

  saveMovie: (req, res) => {
    console.log('Add: ' + req.body.movie.title);
    movieModel.findOneAndUpdate(
      {
        id: req.body.movie.id
      },
      {
        adult: req.body.movie.adult,
        genre_ids: req.body.movie.genre_ids,
        id: req.body.movie.id,
        original_language: req.body.movie.original_language,
        original_title: req.body.movie.original_title,
        overview: req.body.movie.overview,
        popularity: req.body.movie.popularity,
        poster_path: req.body.movie.poster_path,
        release_date: req.body.movie.release_date,
        title: req.body.movie.title,
        vote_average: req.body.movie.vote_average,
        vote_count: req.body.movie.vote_count
      },
      {
        upsert: true
      },
      (result) => {
        res.sendStatus(200);
      }
    )
  },

  deleteMovie: (req, res) => {
    console.log('Remove: ' + req.query.movie);
    let movie = JSON.parse(req.query.movie);
    movieModel.findOneAndUpdate(
      {
        id: movie.id
      },
      {
        deleted_date: Date.now()
      },
      {
        upsert: true
      },
      (result) => {
        res.sendStatus(200);
      }
    )
  },

  getFavs: (req, res) => {
    movieModel.find(
      {
        deleted_date: null
      },
      (err, result) => {
        console.log(result);
        res.send(result);
      }
    )
  }
}