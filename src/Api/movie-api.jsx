const API_KEY = '5cd640db7a351fb891b792aab5d5ad11'; // Replace with your TMDb API key 
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetches now playing movies from TMDb.
 * @returns {Promise<Array>} List of now playing movies.
 */
export const fetchNowPlayingMovies = async () => {
  try {
    // Specify the region (optional, but can help ensure results are specific to the US or another region)
    const region = 'US'; // You can change this to any valid region code, e.g., 'GB' for Great Britain
    const page = 1; // This is for pagination; you can change it based on how many pages you want to fetch
    
    // Fetch now playing movies from the API
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=${region}&page=${page}`);
    
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
 * Fetches popular movies from TMDb.
 * @returns {Promise<Array>} List of popular movies.
 */
export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    return data.results; // Return the array of movies
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error; // Propagate the error
  }
};

/**
 * Fetches details of a specific movie by its ID.
 * @param {number} movieId - The ID of the movie.
 * @returns {Promise<Object>} Details of the movie.
 */
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for movie ID: ${movieId}`);
    }
    const data = await response.json();
    return data; // Return movie details
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error; // Propagate the error
  }
};
