import React, { useEffect, useState } from 'react';
import { fetchNowPlayingMovies, fetchUpcomingMovies } from '../../Api/moviesApi'; 
import MoviesContainer from './MoviesContainer.jsx'; 
import '../MoviesContainer/MoviesContainer.css'; 

const LatestMoviesSection = () => {
  const [movies, setMovies] = useState([]); 
  const [visibleMovies, setVisibleMovies] = useState(6); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);

        const nowPlayingMovies = await fetchNowPlayingMovies(1);
        const upcomingMovies = await fetchUpcomingMovies(1);

        const mergedMovies = [...nowPlayingMovies, ...upcomingMovies]
          .filter(movie => movie.release_date) // Exclude movies without a release date
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); // Newest first

        if (JSON.stringify(mergedMovies) !== JSON.stringify(movies)) {
          setMovies(mergedMovies);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    getMovies();

    const intervalId = setInterval(getMovies, 30000); 

    return () => clearInterval(intervalId);
  }, [movies]);

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 6); 
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!loading && movies.length === 0) {
    return <div className="no-movies">No movies available at the moment.</div>;
  }

  return (
    <MoviesContainer
      title="Latest & Upcoming Movies"
      movies={movies.slice(0, visibleMovies)}
      onLoadMore={handleLoadMore}
      hasMore={visibleMovies < movies.length}
    />
  );
};

export default LatestMoviesSection;
