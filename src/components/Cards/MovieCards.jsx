import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MovieCard = ({ movie, genres, itemsToShow, openModal }) => {
  const formatGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) return "Unknown genres";
    const genreNames = genreIds
      .map((id) => genres[id] || "Unknown")
      .filter(Boolean);
    return genreNames.length ? genreNames.join(", ") : "Unknown genres";
  };

  // Helper function to validate date
  const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()); // Returns true if the date is valid
  };

  // Get the current month in a readable format
  const getCurrentMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthIndex = new Date().getMonth();
    return months[currentMonthIndex];
  };

  return (
    <div
      className="movie-card"
      style={{
        flex: `0 0 ${100 / itemsToShow}%`,
        maxWidth: `${100 / itemsToShow}%`,
      }}
    >
      <div className="img-div-slider">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/fallback-image.jpg"
          }
          alt={movie.title}
          className="movie-image"
        />
      </div>
      <div className="text-div-slider">
        {/* Conditionally render the circular progress bar */}
        {movie.vote_average > 0 && (
          <div className="circular-progress">
            <CircularProgressbar
              value={movie.vote_average * 10}
              text={`${Math.round(movie.vote_average * 10)}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#3f3f3f",
                textColor: "#fff",
                textSize: "25px",
                pathColor: "#00fcfc",
                trailColor: "red",
              })}
            />
          </div>
        )}

        <div className="btn-div-slider">
          <button
            className="watch-trailer-btn"
            onClick={() => openModal(movie)} // Pass entire movie object
          >
            Watch Trailer
          </button>
        </div>
        <p className="movie-title">{movie.title}</p>
        {/* Conditionally render the release date */}
        {isValidDate(movie.release_date) ? (
          <p className="movie-release-date">
            {new Date(movie.release_date).toLocaleDateString()}
          </p>
        ) : (
          <p className="movie-release-date">{getCurrentMonth()}</p> // Display current month if the date is invalid
        )}
        <p className="movie-genres">{formatGenres(movie.genre_ids)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
