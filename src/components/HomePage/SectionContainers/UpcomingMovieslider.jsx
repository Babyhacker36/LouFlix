import React, { useRef, useEffect, useState } from 'react';
import { fetchUpcomingMovies, fetchGenres, fetchMovieVideos } from '../../../Api/moviesApi.jsx';
import './HomeMoviesSlider.css';
import MovieCard from '../../Cards/MovieCards.jsx';
import MovieModal from '../../Modals/MovieModal.jsx';

const UpcomingMoviesSlider = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const sliderRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const getMoviesAndGenres = async () => {
      try {
        setLoading(true);
        const [upcomingMovies, genresData] = await Promise.all([
          fetchUpcomingMovies(1),
          fetchGenres(),
        ]);

        // Get the next day's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // Set the time to midnight for comparison

        // Filter movies to include only those with a release date from tomorrow onwards
        const filteredMovies = upcomingMovies.filter((movie) => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= tomorrow;
        });

        // Sort movies by release date (newest first)
        const sortedMovies = filteredMovies.sort((a, b) =>
          new Date(b.release_date) - new Date(a.release_date)
        );

        setMovies(sortedMovies);
        setGenres(genresData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movies or genres. Please try again later.');
        setLoading(false);
      }
    };

    getMoviesAndGenres();
  }, []);

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

  const scrollLeft = () => sliderRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  const scrollRight = () => sliderRef.current.scrollBy({ left: 250, behavior: 'smooth' });

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX || e.touches[0].pageX;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.scrollBehavior = 'auto'; // Disable smooth scrolling during drag
    e.preventDefault(); // Prevent default actions like text selection
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX || e.touches[0].pageX;
    const distanceDragged = startX.current - x;

    // Allow minimal movement to activate dragging
    if (Math.abs(distanceDragged) > 0) {
      sliderRef.current.scrollLeft = scrollLeftStart.current + distanceDragged;
    }

    e.preventDefault(); // Prevent unintended behaviors like page scrolling on touch devices
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      sliderRef.current.style.scrollBehavior = 'smooth'; // Re-enable smooth scrolling after drag
    }
    isDragging.current = false; // Reset dragging state
  };

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movies.length) return <div className="no-movies">No upcoming movies available at the moment.</div>;

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <h2>Upcoming Movies</h2>
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
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={genres}
              itemsToShow={itemsToShow}
              openModal={openModal}
            />
          ))}
        </div>
        <button className="arrow-btn right" onClick={scrollRight}>&#9654;</button>
      </div>
      <MovieModal isOpen={isModalOpen} videoUrl={videoUrl} onClose={closeModal} />
    </div>
  );
};

export default UpcomingMoviesSlider;
