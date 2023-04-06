import { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import getMovies from 'service/getMovies';
import poster from '../images/default_poster.jpg';

const MovieDetails = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  const [movie, setMovie] = useState({
    title: '',
    genres: [],
    overview: '',
    runtime: 0,
    vote_average: 0,
    poster_path: '',
    release_date: '',
  });
  const { movieId } = useParams();
  const endpoint = `/movie/${movieId}`;

  useEffect(() => {
    getMovies(endpoint).then(
      ({
        title,
        genres,
        overview,
        runtime,
        vote_average,
        poster_path,
        release_date,
      }) => {
        setMovie({
          title,
          genres,
          overview,
          runtime,
          vote_average,
          poster_path,
          release_date,
        });
      }
    );
  }, []);

  const {
    title,
    runtime,
    vote_average,
    genres,
    overview,
    poster_path,
    release_date,
  } = movie;

  const release_year = new Date(release_date).getFullYear();
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : poster;

  return (
    <>
      <div className="goBack">
        <Link to={backLinkHref}>Go back</Link>
      </div>

      <div>
        <img src={posterUrl} alt={title} />
        <div>
          <h2>
            {title} ({release_year})
          </h2>
          <p>Runtime: {runtime} min</p>
          <p>Vote average: {vote_average}</p>
          <p>{overview}</p>
          {genres.map(({ name, id }) => {
            return (
              <span className="genre" key={id}>
                {name}
              </span>
            );
          })}
        </div>
      </div>
      <ul>
        <li>
          <Link to="cast" state={{ from: location }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: location }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
export default MovieDetails;
