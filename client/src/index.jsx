import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      selectedGenre: null,
      showFaves: false,
    };
    
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.getMovies(28);
  }
  
  getMovies(genre) {
    console.log(genre);
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('movies/search', {
      params: {
        genre_id: genre
      }
    })
    .then((moviesFound) => {
      this.setState({
        movies: moviesFound.data
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  saveMovie(movie) {
    axios.post('movies/save', {
      movie: movie
    })
    .then((res) => {

    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteMovie() {
    axios.post('movies/delete', {
      movie: movie
    })
    .then((res) => {

    })
    .catch((err) => {
      console.log(err);
    });
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} getMovies={this.getMovies} selectGenre={this.selectGenre} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} saveMovie={this.saveMovie} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));