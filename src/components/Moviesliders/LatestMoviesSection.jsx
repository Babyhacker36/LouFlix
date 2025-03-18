import React, { useEffect, useState } from "react";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from "../../Api/moviesApi.jsx";
import HomeContainer from "./HomeContainers.jsx";
import "../SectionContainers/HomeContainer.css";

const LatestMoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);

        const nowPlayingMovies = await fetchNowPlayingMovies(1);
        const upcomingMovies = await fetchUpcomingMovies(1);

        // Combine, deduplicate, and sort movies by newest release date
        const mergedMovies = [...nowPlayingMovies, ...upcomingMovies]
          .filter(
            (movie, index, self) =>
              self.findIndex((m) => m.id === movie.id) === index
          )
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); // Newest first

        setMovies(mergedMovies);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    getMovies();

    const intervalId = setInterval(getMovies, 30000); // Refresh movies every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!loading && movies.length === 0) {
    return <div className="no-movies">No movies available at the moment.</div>;
  }

  return <HomeContainer title="Latest & Upcoming Movies" movies={movies} />;
};

export default LatestMoviesSection;
