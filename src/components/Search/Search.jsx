// Search.js
import React, { useState } from "react";
import { searchMovies } from "../../Api/moviesApi";

const Search = ({ onMovieSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      return;
    }
    setIsLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results.slice(0, 6));
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Search for Movies"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="searchbutton2" type="submit">
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}

      {showResults && (
        <div>
          <h3>Search Results:</h3>
          <div >
            {searchResults.map((result) => (
              <div key={result.id} onClick={() => onMovieSelect(result)}>
                <h5>{result.title}</h5>
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  alt={result.title}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
