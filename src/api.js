import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzgxOGM1YjY2MDkzOWEwZWMxMjNhYzJiMjdiYzNjZCIsIm5iZiI6MTczMjM2OTI1NC40NDI1MzgsInN1YiI6IjY3M2Y1YmVkNjJiZDc4ZTU3MTU4YjE4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TdadG_x8YZYJetV43gQYhJNefU-sbF67cblQf2hrQDA";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await apiClient.get("/trending/movie/day");
    return response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
    }));
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchMovies = async (query) => {
  try {
    const response = await apiClient.get("/search/movie", {
      params: {
        query: query,
        language: "en-US",
      },
    });
    return response.data; // Axios повертає дані вже обробленими в `response.data`
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
};
// export const fetchMoviesByQuery = async (query) => {
//   const response = await fetch(
//     `${BASE_URL}/search/movie?query=${query}&api_key=${API_TOKEN}&language=en-US`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch movies");
//   }

//   const data = await response.json();
//   return data.results || []; // Завжди повертаємо масив
// };

// export const fetchMovies = async () => {
//   try {
//     const response = await apiClient.get(`/movie/popular`, {
//       params: {
//         language: "en-US", // Встановлюємо мову відповіді
//         page: 1, // Опціонально: сторінка результатів
//       },
//     });

//     // Форматуємо відповідь, повертаємо потрібні поля
//     return response.data.results.map((movie) => ({
//       id: movie.id,
//       title: movie.title,
//     }));
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     throw new Error("Failed to fetch movies");
//   }
// };

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        language: "en-US", // Мова відповіді
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw error; // Викидаємо помилку для обробки у викликах
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/credits`, {
      params: {
        language: "en-US",
      },
    });
    return response.data.cast; // Повертаємо тільки список акторів
  } catch (error) {
    console.error("Error fetching movie cast:", error.message);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/reviews`);
    return response.data.results; // Повертаємо масив відгуків
  } catch (error) {
    throw new Error("Failed to fetch movie reviews");
  }
};
