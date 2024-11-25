import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MovieCard = ({ movie, genres, itemsToShow, openModal }) => {
  const formatGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) return 'Unknown genres';
    const genreNames = genreIds.map((id) => genres[id]).filter(Boolean);
    return genreNames.length ? genreNames.join(', ') : 'Unknown genres';
  };

  return (
    <div
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
        <div className="circular-progress">
          <CircularProgressbar
            value={movie.vote_average * 10}
            text={`${Math.round(movie.vote_average * 10)}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#808080",
              textColor: "#fff",
              textSize: "25px",
              pathColor: "#fff",
              trailColor: "red",
            })}
          />
        </div>
        <p className="movie-title">{movie.title}</p>
        <p className="movie-release-date">{new Date(movie.release_date).toLocaleDateString()}</p>
        <p className="movie-genres">{formatGenres(movie.genre_ids)}</p>
      </div>
      <div className="btn-div-slider">
        <button className="ticket-btn" onClick={() => openModal(movie.id)}>Watch Trailer</button>
      </div>
    </div>
  );
};

export default MovieCard;
