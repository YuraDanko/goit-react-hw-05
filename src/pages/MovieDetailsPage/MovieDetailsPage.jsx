import { useLocation, useNavigate, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../api";
const MovieDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const movieId = location.pathname.split("/")[2];
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={() => navigate(backLink)}>Go back</button>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h1>
            {movie.title} ({movie.release_date.split("-")[0]})
          </h1>
          <p>
            <b>User Score:</b> {Math.round(movie.vote_average * 10)}%
          </p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink to="cast" state={{ from: backLink }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: backLink }}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
