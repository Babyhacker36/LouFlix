import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Assets/Images/louflix.png";
import "../Navigation/nav.css"; 
import { searchMovies } from "../../Api/moviesApi"; 
import Search from "../Search/Search"; // Import the Search component


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showResults, setShowResults] = useState(false); // State to control visibility of search results
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedMovie, setSelectedMovie] = useState(null); // State to store selected movie

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle input change for the search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission for search
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      return; // Don't search if query is empty
    }

    setIsLoading(true); // Set loading to true while waiting for the API response

    try {
      // Call the searchMovies function to fetch data from the API
      const results = await searchMovies(searchQuery);

      // Set the search results in the state and limit to top 6 results
      setSearchResults(results.slice(0, 6));
      setShowResults(true); // Show search results row
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Toggle visibility of the search results
  const toggleResultsVisibility = () => {
    setShowResults(!showResults);
  };

  // Handle opening and closing of the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle selecting a movie to show in the modal
  const handleMovieSelect = async (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);

    // Fetch the movie trailer video details
    try {
      const videoData = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=5cd640db7a351fb891b792aab5d5ad11`
      );
      const videoJson = await videoData.json();
      const trailer = videoJson.results.find(
        (video) => video.type === "Trailer"
      );
      if (trailer) {
        setSelectedMovie({
          ...movie,
          trailerId: trailer.key, // Store the trailer ID
        });
      }
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Logo Section */}
          <div className="col-1">
            <a className="navbar-brand" href="https://louiscarterjr.com/louflix/">
              <img
                src={logo}
                alt="Logo"
                className="navbar-logo" // Added custom class
              />
            </a>
          </div>

          {/* Hamburger Menu (for mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Center Navigation */}
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarNav"
          >

<div className="searchdiv"> <Search /></div>
            <div className="col-12 d-flex">

              
              <ul className="navbar-nav d-flex" style={{ gap: "35px" }}>
                <li className="nav-item">
                  <a className="nav-link" href="#upcoming">
                    UPCOMING MOVIES
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#latest">
                    LATEST MOVIES
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#top">
                    TOP RATED TV SHOWS
                  </a>
                </li>
              </ul>
           
            </div>
         
          </div>

          {/* Search Section */}
          <div className="col-3 d-none d-lg-block">
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for Movies"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange} // Update search query
              />
              <button className="btn btn-danger" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Display loading state */}
      {isLoading && <p className="text-center mt-3">Loading...</p>}

      {/* Display search results below navbar */}
      {showResults && (
        <div className="container-fluid w-100 mt-5">
          <div style={{textAlign: "right", marginBottom: "10px"}} >
            <h3>Search Results:</h3>
            <button
              className="close-results"
              onClick={toggleResultsVisibility}
            >
              Close Results
            </button>
          </div>

          {/* Flexbox for evenly spaced cards */}
          <div className="row d-flex justify-content-start test">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="col-xs-2 col-sm-2 col-md2 col-lg-2 col-xl-2 col-xxl-2 mb-4 d-flex justify-content-center"
              >
                <div
                  className="card"
                  style={{
                    width: "300px", // Set fixed width for the card
                    minHeight: "300px", // Set minimum height for the card
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    alt={result.title}
                    className="card-img-top"
                    loading="lazy"
                    style={{
                      height: "70%", // Image takes up 70% of the card's height
                      objectFit: "cover", // Ensure the image fits within the container without cutting off
                      objectPosition: "center", // Align the image to the top of the container
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      height: "30%", // Body takes up the remaining 30% of the card's height
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <h5 className="card-title">{result.title}</h5>
                    <button
                      className="btn btn-primary search-btn"
                      onClick={() => handleMovieSelect(result)}
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for "Watch Now" */}
      {showModal && selectedMovie && selectedMovie.trailerId && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{ display: "block" }}
          onClick={toggleModal}
        >
          <div className="modal-dialog">
            <div className="modal-content modalcontent2">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMovie.title}</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <iframe
                className="modalframe2"
                  title="Movie Trailer"
                  width="100%"
                  height="415"
                  src={`https://www.youtube.com/embed/${selectedMovie.trailerId}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>{selectedMovie.overview}</p>
                <p>Release Date: {selectedMovie.release_date}</p>
                <p>Runtime: {selectedMovie.runtime} mins</p>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show a message if no results found */}
      {searchResults.length === 0 && searchQuery && !isLoading && (
        <p className="mt-2">No results found for "{searchQuery}"</p>
      )}
    </div>
  );
}

export default Navbar;
