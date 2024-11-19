import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../Api/movie-api';
import './TestMovies.css'; // Import CSS for styling

const TestMovies = () => {
  const [movies, setMovies] = useState([]); // All fetched movies
  const [visibleMovies, setVisibleMovies] = useState(5); // Number of movies to display
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const movieData = await fetchPopularMovies();
        setMovies(movieData); // Store all fetched movies
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    getMovies();

    const intervalId = setInterval(getMovies, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Load more movies
  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 5); // Load 6 more movies
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="movies-container">
      <h1>Now Playing</h1>
      <div className="movies-list">
        {movies.slice(0, visibleMovies).map((movie) => (
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

      {/* Load More button */}
      {visibleMovies < movies.length && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default TestMovies;
