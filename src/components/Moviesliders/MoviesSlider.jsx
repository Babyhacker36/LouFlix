import React, { useRef, useEffect, useState } from 'react';
import { fetchNowPlayingMovies, fetchUpcomingMovies } from '../../Api/moviesApi.jsx';
import './MoviesSlider.css';

const MoviesSlider = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(4);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);

        const nowPlayingMovies = await fetchNowPlayingMovies(1);
        const upcomingMovies = await fetchUpcomingMovies(1);

        const mergedMovies = [
          ...nowPlayingMovies,
          ...upcomingMovies,
        ]
          .filter(
            (movie, index, self) => self.findIndex((m) => m.id === movie.id) === index
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

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1200) {
        setItemsToShow(6); // Large screens
      } else if (window.innerWidth >= 768) {
        setItemsToShow(4); // Medium screens
      } else {
        setItemsToShow(2); // Small screens
      }
    };

    updateItemsToShow(); // Call once on mount
    window.addEventListener('resize', updateItemsToShow);

    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  // Handling drag/swipe
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const isTouch = useRef(false);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX || e.touches[0].pageX;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
    e.preventDefault();  // Prevent default browser scroll behavior
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX.current) * 1.5; // Adjust the drag speed
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    isTouch.current = true;
    handleMouseDown(e);
  };

  const handleTouchMove = (e) => {
    if (isTouch.current) {
      handleMouseMove(e);
    }
  };

  const handleTouchEnd = () => {
    isTouch.current = false;
    handleMouseUp();
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
    <div className="slider-container" style={{ margin: '20px 0' }}>
      <button className="arrow-btn left" onClick={scrollLeft}>
        &#9664; {/* Left arrow */}
      </button>
      <div
        className="movies-slider"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          gridTemplateColumns: `repeat(${movies.length}, calc(100% / ${itemsToShow}))`,
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-release-date">{movie.release_date}</p>
            <p className="movie-score">Score: {movie.vote_average}</p>
          </div>
        ))}
      </div>
      <button className="arrow-btn right" onClick={scrollRight}>
        &#9654; {/* Right arrow */}
      </button>
    </div>
  );
};

export default MoviesSlider;
