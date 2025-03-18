const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Fetch API key from environment
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetch data from a given URL and handle errors.
 * @param {string} url - The API endpoint URL.
 * @returns {Promise<any>} Parsed JSON data from the response.
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from: ${url}, Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Error fetching data. Please try again later.');
  }
};

/**
 * Fetches now playing movies (movies currently in theaters).
 * @param {number} page - The page number for pagination.
 * @param {string} region - Optional, the region for filtering by country (e.g., 'US').
 * @returns {Promise<Array>} List of now playing movies.
 */
export const fetchInTheaters = async (page = 1, region = 'US') => {
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}&region=${region}`;
  const data = await fetchData(url);
  return data.results; // Return the array of now playing movies
};

/**
 * Fetches upcoming movies from TMDb.
 * @param {number} page - The page number for pagination.
 * @param {string} region - Optional, the region for filtering by country (e.g., 'US').
 * @returns {Promise<Array>} List of upcoming movies.
 */
export const fetchUpcomingMovies = async (page = 1, region = 'US') => {
  const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}&region=${region}`;
  const data = await fetchData(url);
  return data.results; // Return the array of upcoming movies
};

/**
 * Fetches video data for a specific movie.
 * @param {number} movieId - The movie ID.
 * @returns {Promise<string|null>} The YouTube video embed URL or null if no video is found.
 */
export const fetchMovieVideos = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;
  const data = await fetchData(url);
  const video = data.results.find((v) => v.site === 'YouTube');
  return video ? `https://www.youtube.com/embed/${video.key}` : null;
};

/**
 * Fetches movie details, including genres and runtime.
 * @param {number} movieId - The movie ID.
 * @returns {Promise<Object>} An object containing movie details including genres and runtime.
 */
export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
  const data = await fetchData(url);

  return {
    genres: data.genres.map((genre) => genre.name).join(', '), // Combine genre names into a string
    runtime: data.runtime, // Add the runtime from the response
    ...data,
  };
};

/**
 * Fetches a list of movie genres from TMDb.
 * @returns {Promise<Object>} A mapping of genre IDs to genre names.
 */
export const fetchGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name; // Map genre ID to genre name
    return acc;
  }, {});
};

/**
 * Fetches credits (cast and crew) for a specific movie.
 * @param {number} movieId - The movie ID.
 * @returns {Promise<Object>} An object containing the cast and crew details.
 */
export const fetchCredits = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data; // Return the cast and crew details
};

/**
 * Fetches popular TV shows from TMDb.
 * @param {number} page - The page number for pagination.
 * @param {string} region - Optional, the region for filtering by country (e.g., 'US').
 * @returns {Promise<Array>} List of popular TV shows.
 */
export const fetchPopularTVShows = async (page = 1, region = 'US') => {
  const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}&region=${region}`;
  const data = await fetchData(url);
  return data.results; // Return the array of popular TV shows
};

/**
 * Fetches search results based on the search query.
 * @param {string} query - The search query entered by the user.
 * @param {number} page - The page number for pagination (default is 1).
 * @returns {Promise<Array>} List of search results.
 */
export const searchMovies = async (query, page = 1) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  const data = await fetchData(url);
  return data.results; // Return the search results array
};

/**
 * Fetches top-rated TV shows from TMDb.
 * @param {number} page - The page number for pagination.
 * @param {string} region - Optional, the region for filtering by country (e.g., 'US').
 * @returns {Promise<Array>} List of top-rated TV shows.
 */
export const fetchTopRatedTVShows = async (page = 1, region = 'US') => {
  const url = `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}&region=${region}`;
  const data = await fetchData(url);
  return data.results; // Return the array of top-rated TV shows
};
