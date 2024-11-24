import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../api";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      try {
        const movieResults = await fetchMovies(query);
        setMovies(movieResults.results);
      } catch (err) {
        setError(err.message);
      }
    };

    searchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>Error: {error}</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: `/movies?query=${query}` }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
