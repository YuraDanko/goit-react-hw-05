import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Error fetching trending movies:", error.message);
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovies();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Treding today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
