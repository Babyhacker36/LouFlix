import React, { useRef, useEffect, useState } from "react";
import { fetchTopRatedTVShows, fetchGenres, fetchMovieVideos, fetchCredits, fetchMovieDetails } from "../../../Api/moviesApi.jsx";
import "./HomeMoviesSlider.css";
import MovieCard from "../../Cards/MovieCards.jsx";
import MovieModal from "../../Modals/MovieModal.jsx";

const TopRatedTvShowsSlider = () => {
  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedTvShow, setSelectedTvShow] = useState(null);

  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const getTvShowsAndGenres = async () => {
      try {
        setLoading(true);
        const [topRatedTvShows, genresData] = await Promise.all([fetchTopRatedTVShows(), fetchGenres()]);

        setTvShows(topRatedTvShows);
        setGenres(genresData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch TV shows or genres. Please try again later.");
        setLoading(false);
      }
    };

    getTvShowsAndGenres();
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

  const scrollLeft = () => sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () => sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });

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

  const openModal = async (tvShow) => {
    try {
      const videoUrl = await fetchMovieVideos(tvShow.id); // Use fetchMovieVideos for TV shows
      const credits = await fetchCredits(tvShow.id);
      const tvShowDetails = await fetchMovieDetails(tvShow.id); // Use fetchMovieDetails for TV shows

      // Check if the date or runtime is invalid, and remove it if necessary
      const validTvShow = {
        ...tvShow,
        credits,
        runtime: tvShowDetails && tvShowDetails.runtime > 0 ? tvShowDetails.runtime : null, // Set null if invalid runtime
      };

      if (videoUrl) {
        setVideoUrl(videoUrl);
        setSelectedTvShow(validTvShow); // Pass the valid TV show object
        setIsModalOpen(true);
      } else {
        alert("No trailer available for this TV show.");
      }
    } catch (err) {
      alert("An error occurred while fetching TV show details.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
    setSelectedTvShow(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!tvShows.length) return <div className="no-movies">No top-rated TV shows available at the moment.</div>;

  // Separate TV shows with trailers and without trailers
  const tvShowsWithTrailer = tvShows.filter((tvShow) => tvShow.videoUrl);
  const tvShowsWithoutTrailer = tvShows.filter((tvShow) => !tvShow.videoUrl);

  // Combine the arrays so that TV shows with trailers come first
  const sortedTvShows = [...tvShowsWithTrailer, ...tvShowsWithoutTrailer];

  return (
    <div className="slider-container"  id="top">
      <div className="slider-wrapper">
        <h2>Top Rated TV Shows</h2>
        <button className="arrow-btn left" onClick={scrollLeft}>
          &#9664;
        </button>
        <div
          className="movies-slider hide-circle-progress"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {sortedTvShows.map((tvShow) => (
            <MovieCard
              key={tvShow.id}
              movie={tvShow}
              genres={genres}
              itemsToShow={itemsToShow}
              openModal={() => openModal(tvShow)} // Pass tvShow object
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
        movie={selectedTvShow} // Pass selected tvShow details
        onClose={closeModal}
        genres={genres} // pass the genres data here
      />
    </div>
  );
};

export default TopRatedTvShowsSlider;
