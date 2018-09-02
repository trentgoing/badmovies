import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(movie) {
    console.log(movie);
    if (this.props.showFaves) {
      this.props.deleteMovie(movie);
    } else {
      this.props.saveMovie(movie);
    }
  }

  render() {
    return (
      <ul className="movies">

        {this.props.movies.map((movie) => {
          return (
            <li onClick={() => {this.handleClick(movie)}} key={parseInt(movie.id)} className="movie_item">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path || "/iKRoQzbkyEJpr9DMYcfbCux0jdb.jpg"}`}  />
              <div className="movie_description">
                <h2>{movie.title}</h2> 
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.release_date}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.vote_average}</span>
                  </div>
                </section>
              </div>
            </li>
          );
        })}

      </ul>
    );
  }
}

export default Movies;