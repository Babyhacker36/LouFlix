import React, { useRef, useEffect, useState } from "react";
import {
  fetchInTheaters, 
  fetchGenres,
  fetchMovieVideos,
  fetchCredits, 
  fetchMovieDetails
} from "../../../Api/moviesApi.jsx";
import "./HomeMoviesSlider.css";
import MovieCard from "../../Cards/MovieCards.jsx";
import MovieModal from "../../Modals/MovieModal.jsx";

const InTheatersMoviesSlider = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null); // Store selected movie details

  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const getMoviesAndGenres = async () => {
      try {
        setLoading(true);
        const [inTheatersMovies, genresData] = await Promise.all([
          fetchInTheaters(), // Assuming this fetches "In Theaters" movies
          fetchGenres(),
        ]);

        setMovies(inTheatersMovies);
        setGenres(genresData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies or genres. Please try again later.");
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
    window.addEventListener("resize", updateItemsToShow);

    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  const scrollLeft = () =>
    sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () =>
    sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX || e.touches[0].pageX;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.scrollBehavior = "auto";
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX || e.touches[0].pageX;
    const distanceDragged = startX.current - x;

    if (Math.abs(distanceDragged) > 0) {
      sliderRef.current.scrollLeft = scrollLeftStart.current + distanceDragged;
    }

    e.preventDefault();
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      sliderRef.current.style.scrollBehavior = "smooth";
    }
    isDragging.current = false;
  };

  const openModal = async (movie) => {
    try {
      const videoUrl = await fetchMovieVideos(movie.id);
      const credits = await fetchCredits(movie.id); 
      const movieDetails = await fetchMovieDetails(movie.id);

      if (videoUrl) {
        setVideoUrl(videoUrl);
        setSelectedMovie({ ...movie, runtime: movieDetails.runtime,credits }); // Pass movie details to the modal
        setIsModalOpen(true);
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (err) {
      alert("An error occurred while fetching the video.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
    setSelectedMovie(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div className="error">{error}</div>;
  if (!movies.length)
    return <div className="no-movies">No movies available at the moment.</div>;

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <h2>In Theaters</h2>
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
            <MovieCard
              key={movie.id}
              movie={movie}
              itemsToShow={itemsToShow}
              openModal={() => openModal(movie)} // Pass movie object
              genres={genres}
            />
          ))}
        </div>
        <button className="arrow-btn right" onClick={scrollRight}>
          &#9654;
        </button>
      </div>
      <MovieModal
  isOpen={isModalOpen}
  videoUrl={videoUrl}
  onClose={closeModal}
  movie={selectedMovie}
  genres={genres} // pass the genres data here
/>
    </div>
  );
};

export default InTheatersMoviesSlider;
