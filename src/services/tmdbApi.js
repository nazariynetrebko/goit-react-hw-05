import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
if (!API_KEY) {
  throw new Error(
    "TMDB API key is missing. Please set VITE_TMDB_API_KEY in .env file."
  );
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: { Authorization: `Bearer ${API_KEY}` },
});

export const getTrendingMovies = async () => {
  const response = await api.get(`trending/movie/day`);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get(`search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await api.get(`movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`movie/${movieId}/credits`, {
      params: {
        language: "en-US",
      },
    });
    return response.data.cast;
  } catch (error) {
    console.error(
      `Помилка при отриманні акторського складу для movieId ${movieId}:`,
      error
    );
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  const response = await api.get(`movie/${movieId}/reviews`, {
    params: {
      language: "en-US",
      page: 1,
    },
  });
  return response.data.results;
};
