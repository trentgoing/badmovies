
//For Mongo
const mongoDb = require('../../db/mongodb')
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieSchema = new Schema({
  adult: Boolean,
  genre_ids: [Number],
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  vote_average: Number,
  vote_count: Number,
  deleted_date: Date
});

var Movie = mongoose.model('Movie', movieSchema);


module.exports = {
  Movie: Movie,
  mongoDb: mongoDb
}