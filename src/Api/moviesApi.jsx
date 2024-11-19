const API_KEY = '5cd640db7a351fb891b792aab5d5ad11'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetches now playing movies (movies currently in theaters).
 * @param {number} page - The page number for pagination.
 * @param {string} region - Optional, the region for filtering by country (e.g., 'US').
 * @returns {Promise<Array>} List of now playing movies.
 */
export const fetchNowPlayingMovies = async (page = 1, region = 'US') => {
  try {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}&region=${region}`);
    if (!response.ok) {
      throw new Error('Failed to fetch now playing movies');
    }
    const data = await response.json();
    return data.results; // Return the array of now playing movies
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error; // Propagate the error
  }
};

/**
 * Fetches upcoming movies from TMDb.
 * @param {number} page - The page number for pagination.
 * @param {string} region - Optional, the region for filtering by country (e.g., 'US').
 * @returns {Promise<Array>} List of upcoming movies.
 */
export const fetchUpcomingMovies = async (page = 1, region = 'US') => {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}&region=${region}`);
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming movies');
    }
    const data = await response.json();
    return data.results; // Return the array of upcoming movies
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error; // Propagate the error
  }
};
