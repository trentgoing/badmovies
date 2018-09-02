import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: 80
    };

    this.getGenres = this.getGenres.bind(this);
    this.selectGenre = this.selectGenre.bind(this);
    this.startSearch = this.startSearch.bind(this);
    
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    axios.get('/movies/genres')
         .then((result) => {
           this.setState({
             genres: result.data,
             selectedGenre: result.data[0]
           })
         })
         .catch((err) => {
           console.log(err);
         })
  }

  selectGenre(event) {
    console.log(event.target.value);
    this.setState({
      selectedGenre: event.target.value
    })
  }

  startSearch() {
    this.props.getMovies(this.state.selectedGenre);
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.selectGenre} value={this.state.selectedGenre}>
          {this.state.genres.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            );
          })}
        </select>
        <br/><br/>

        <button onClick={this.startSearch}>Search</button>

      </div>
    );
  }
}

export default Search;