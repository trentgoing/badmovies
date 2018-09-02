const movieModel = require('../models/movieModel.js');
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
  },

  deleteMovie: (req, res) => {
    console.log('Remove: ' + req.body.movie.title);
  }
}