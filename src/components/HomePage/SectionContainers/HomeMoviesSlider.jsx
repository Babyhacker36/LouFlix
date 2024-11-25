import React, { useRef, useEffect, useState } from 'react';
import { fetchNowPlayingMovies, fetchUpcomingMovies, fetchMovieVideos, fetchGenres } from '../../../Api/moviesApi';
import './HomeMoviesSlider.css';

const MoviesSlider = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({}); // Store genre mapping
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const sliderRef = useRef(null);

  // Fetch movies and genres on mount
  useEffect(() => {
    const getMoviesAndGenres = async () => {
      try {
        setLoading(true);
        const [nowPlayingMovies, upcomingMovies, genresData] = await Promise.all([
          fetchNowPlayingMovies(1),
          fetchUpcomingMovies(1),
          fetchGenres(),
        ]);

        const mergedMovies = [
          ...nowPlayingMovies,
          ...upcomingMovies,
        ]
          .filter((movie, index, self) => self.findIndex((m) => m.id === movie.id) === index)
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        setMovies(mergedMovies);
        setGenres(genresData); // Save genres mapping
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movies or genres. Please try again later.');
        setLoading(false);
      }
    };

    getMoviesAndGenres();
  }, []);

  // Dynamically update itemsToShow
  useEffect(() => {
    const updateItemsToShow = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 767) {
        setItemsToShow(1);
      } else {
        const containerWidth = sliderRef.current?.offsetWidth || screenWidth;
        const cardWidth = 250;
        const numberOfItems = Math.floor(containerWidth / cardWidth);
        setItemsToShow(numberOfItems > 0 ? numberOfItems : 1);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);

    return () => {
      window.removeEventListener('resize', updateItemsToShow);
    };
  }, []);

  // Drag-to-scroll logic
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX || e.touches[0].pageX;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Button scroll functionality
  const scrollLeft = () => sliderRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  const scrollRight = () => sliderRef.current.scrollBy({ left: 250, behavior: 'smooth' });

  // Open/close modal with video
  const openModal = async (movieId) => {
    try {
      const videoUrl = await fetchMovieVideos(movieId);
      if (videoUrl) {
        setVideoUrl(videoUrl);
        setIsModalOpen(true);
      } else {
        alert('No trailer available for this movie.');
      }
    } catch (err) {
      alert('An error occurred while fetching the video.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl('');
  };

  // Format genres based on fetched genre mapping
  const formatGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) return 'Unknown genres';
    const genreNames = genreIds.map((id) => genres[id]).filter(Boolean);
    return genreNames.length ? genreNames.join(', ') : 'Unknown genres';
  };

  // Loading, error, or empty states
  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movies.length) return <div className="no-movies">No movies available at the moment.</div>;

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <h2>Latest Movies</h2>
        <button className="arrow-btn left" onClick={scrollLeft}>&#9664;</button>
        <div
          className="movies-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              style={{ flex: `0 0 ${100 / itemsToShow}%`, maxWidth: `${100 / itemsToShow}%` }}
            >
              <div className="img-div-slider">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/fallback-image.jpg'}
                  alt={movie.title}
                  className="movie-image"
                />
              </div>
              <div className="text-div-slider">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-release-date">{new Date(movie.release_date).toLocaleDateString()}</p>
                <p className="movie-genres">{formatGenres(movie.genre_ids)}</p>
                <p className="movie-score">{movie.vote_average === 0 ? 'Not rated yet' : `Score: ${movie.vote_average}`}</p>
              </div>
              <div className="btn-div-slider">
                <button className="ticket-btn" onClick={() => openModal(movie.id)}>Watch Trailer</button>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-btn right" onClick={scrollRight}>&#9654;</button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&#10006;</button>
            <iframe
              title="Movie Trailer"
              width="100%"
              height="100%"
              src={videoUrl}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesSlider;
