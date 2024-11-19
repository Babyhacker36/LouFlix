// MoviesContainer.js
import React from 'react';
import './MoviesContainer.css'; // Import specific CSS for the container

const MoviesContainer = ({ title, movies, onLoadMore, hasMore }) => {
  return (
    <div className="movies-container">
      <h1>{title}</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Movie poster image
              alt={movie.title}
              className="movie-image"
            />
            <div className="movie-details">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-release-date">{movie.release_date}</p>
              <p className="movie-score">Score: {movie.vote_average}</p>
              <button
                className="purchase-button"
                onClick={() => alert(`Purchase Tickets for ${movie.title}`)}
              >
                Tickets / Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button onClick={onLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default MoviesContainer;
