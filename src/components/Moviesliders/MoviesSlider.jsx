import React, { useRef, useEffect, useState } from 'react';
import { fetchNowPlayingMovies, fetchUpcomingMovies, fetchMovieVideos } from '../../Api/moviesApi';
import './MoviesSlider.css';

const MoviesSlider = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(1); // Number of cards to show
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [videoUrl, setVideoUrl] = useState(''); // Store the video URL
  const sliderRef = useRef(null);

  // Fetch movies
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
          .filter((movie, index, self) => self.findIndex((m) => m.id === movie.id) === index)
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        setMovies(mergedMovies);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  // Update the number of visible items dynamically
  useEffect(() => {
    const updateItemsToShow = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 767) {
        setItemsToShow(1); // One card for smaller screens
      } else {
        const containerWidth = sliderRef.current?.offsetWidth || screenWidth;
        const cardWidth = 250; // Approximate width of each card
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
    const walk = (x - startX.current) * 1.5; // Adjust drag speed
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Scroll logic for buttons
  const scrollLeft = () => {
    const scrollAmount = 250; // Adjust based on your card width
    sliderRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const scrollAmount = 250; // Adjust based on your card width
    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Open the modal and set the video URL
  const openModal = async (movieId) => {
    try {
      const videoUrl = await fetchMovieVideos(movieId); // Fetch the video URL using the movie ID
      if (videoUrl) {
        setVideoUrl(videoUrl);
        setIsModalOpen(true);
      } else {
        console.error('No trailer available for this movie.');
        alert('No trailer available for this movie.');
      }
    } catch (error) {
      console.error('Error fetching video:', error);
      alert('An error occurred while fetching the video.');
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl('');
  };

  // Format date to Nov 23, 2024
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Check if the rating is 0 and display "Not rated yet"
  const getRating = (rating) => {
    return rating === 0 ? 'Not rated yet' : `Score: ${rating}`;
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="no-movies">No movies available at the moment.</div>;
  }

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <h2>Latest Movies</h2>
        <button className="arrow-btn left" onClick={scrollLeft}>
          &#9664;
        </button>
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
              style={{
                flex: `0 0 ${100 / itemsToShow}%`, // Dynamic card width
                maxWidth: `${100 / itemsToShow}%`,
              }}
            >
            <div className="img-div-slider">
            <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/fallback-image.jpg'}
                alt={movie.title}
                className="movie-image"
              />
            </div>
              <div className="text-div-slider">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-release-date">{formatDate(movie.release_date)}</p>
                <p className="movie-score">{getRating(movie.vote_average)}</p>
              </div>

              <div className="btn-div-slider">
                <button className="ticket-btn" onClick={() => openModal(movie.id)}>
                  Watch Trailer
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-btn right" onClick={scrollRight}>
          &#9654;
        </button>
      </div>

      {/* Modal for Video */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &#10006;
            </button>

            <div className="modal-left">
              <iframe
                title="Movie Trailer"
                width="100%"
                height="100%"
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="modal-right">
              Right
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesSlider;
