import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const locationRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(locationRef.current);
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>

      {movie && (
        <>
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
                <NavLink to="cast" state={{ from: locationRef.current }}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" state={{ from: locationRef.current }}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
