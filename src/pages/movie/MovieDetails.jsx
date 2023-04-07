import { useState, useEffect } from 'react';
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import getMovies from 'service/getMovies';
import Poster from '../../images/default_poster.jpg';
// import './StylesMovieDetails.scss';

const MovieDetails = ({ prevPageLocation }) => {
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
  }, [endpoint]);

  const {
    title,
    runtime,
    vote_average,
    genres,
    overview,
    poster_path,
    release_date,
  } = movie;

  const release_year = release_date ? new Date(release_date).getFullYear() : '';
  console.log(release_year);
  return (
    <>
      <div className="goBack">
        <Link to={backLinkHref}>Go back</Link>
      </div>

      <div className="movie-wrapper">
        {poster_path ? (
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        ) : (
          <img className="poster" src={Poster} alt={title} />
        )}

        <div className="movie-details">
          <h2>
            {title} {release_year && `(${release_year})`}
          </h2>
          {runtime > 0 && (
            <p>
              <b>Runtime:</b> {runtime} min
            </p>
          )}
          {vote_average > 0 && (
            <p>
              <b>Vote average:</b> {vote_average}
            </p>
          )}
          {overview && (
            <p>
              <b>Overview: </b>
              {overview}
            </p>
          )}

          {genres.length > 0 &&
            <>
              <span className="genre">
                <b>Genres:</b>
              </span>
              {genres.map(({ name, id }) => {
                return (
                  <span className="genre" key={id}>
                    {name}
                  </span>
                );
              })}
            </>
          }
        </div>
      </div>
      <ul className="menu">
        <li className="menu-item">
          <NavLink to="cast" state={{ from: location }}>
            Cast
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="reviews" state={{ from: location }}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    genres: PropTypes.array,
    overview: PropTypes.string,
    runtime: PropTypes.number,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
  }),
};
export default MovieDetails;
