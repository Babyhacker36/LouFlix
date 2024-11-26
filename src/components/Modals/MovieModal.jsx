import React from "react";
import "./MovieModal.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MovieModal = ({ isOpen, videoUrl, onClose, movie = {}, genres = {} }) => {
  // Helper function to format genre names
  const formatGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) return "Unknown genres";
    const genreNames = genreIds.map((id) => genres[id]).filter(Boolean);
    return genreNames.length ? genreNames.join(", ") : "Unknown genres";
  };

  if (!isOpen) return null; // Ensure modal only renders when open

  // Destructure movie properties with default fallbacks
  const {
    title = "No Title Available",
    release_date,
    poster_path,
    vote_average = 0,
    genre_ids = [],
    runtime, // Runtime from the movie details
    credits = {},
  } = movie;

  const { cast = [], crew = [] } = credits;

  // Format release date
  const releaseDate = release_date ? new Date(release_date) : null;
  const releaseYear = releaseDate ? releaseDate.getFullYear() : "N/A";
  const formattedReleaseDate = releaseDate
    ? `${releaseDate.getMonth() + 1}/${releaseDate.getDate()}/${releaseDate
        .getFullYear()
        .toString()
        .slice(-2)}`
    : "N/A";

  // Handle zero rating condition
  const isZeroRating = vote_average === 0;

  // Format runtime (e.g., 125 minutes -> "2h 5m")
  const formattedRuntime = runtime
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : "Runtime not available";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close-row">
          <button className="modal-close-btn" onClick={onClose}>
            &#10006;
          </button>
        </div>

        <div className="modal-content-inner-row">
          {/* Left Side: Trailer */}
          <div className="modal-left">
            <iframe
              title="Movie Trailer"
              width="100%"
              height="100%"
              src={videoUrl}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Right Side: Movie Details */}
          <div className="modal-right">
            <div className="modal-right-image-div">
              {poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className="modal-movie-poster"
                />
              ) : (
                <p>No Image Available</p>
              )}

              <div className="buy-tickets-div">
                {/* Display circular progress bar only if rating is non-zero */}
                {!isZeroRating && (
                  <div className="circular-progress-modal-div">
                    <CircularProgressbar
                      value={vote_average * 10}
                      text={`${Math.round(vote_average * 10)}%`}
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

                {/* Buy Tickets Button */}
                <div
                  className={`buy-tickets-btn-div ${
                    isZeroRating ? "full-width" : ""
                  }`}
                >
                  <button className="watch-trailer-btn">Buy Tickets</button>
                </div>
              </div>
            </div>

            {/* Movie Information */}
            <div className="modal-right-text-div">
              <h2>
                {title} ({releaseYear})
              </h2>
              <div className="movie-details">
                <span className="movie-release-date">
                  Release Date: {formattedReleaseDate}
                </span>
                <span className="movie-genres">
                  Genres: {formatGenres(genre_ids)}
                </span>
                <span className="runtime">Runtime: {formattedRuntime}</span>
              </div>

              {/* Display Cast */}
              <div>
                <h3>Cast:</h3>
                {cast.length > 0 ? (
                  <ul>
                    {cast.slice(0, 5).map((actor) => (
                      <li key={actor.id}>
                        {actor.name} as {actor.character || "Unknown Role"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No cast information available.</p>
                )}
              </div>

              {/* Display Crew */}
              <div>
                <h3>Crew:</h3>
                {crew.length > 0 ? (
                  <ul>
                    {crew.slice(0, 5).map((member) => (
                      <li key={member.id}>
                        {member.name} - {member.job || "Unknown Role"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No crew information available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
