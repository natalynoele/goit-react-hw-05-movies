import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMovies from 'service/getMovies';
import female from '../../images/female.jpg';
import male from '../../images/male.jpg';

const Cast = () => {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  const endpoint = `/movie/${movieId}/credits`;

  useEffect(() => {
    getMovies(endpoint).then(response => {
      setActors(response.cast);
    });
  }, [endpoint]);

  const actorsList = actors.map(
    ({ credit_id, profile_path, name, character, gender }) => {
      const default_img = gender === 2 ? male : female;
      const profile_img = profile_path
        ? `https://image.tmdb.org/t/p/w300${profile_path}`
        : default_img;
      return (
        <li key={credit_id} className='actors-item'>
          <img
            src={profile_img}
            alt={name}
          />

          <p>
            {gender === 2 ? 'Actor: ' : 'Actress: '}
            <b>{name}</b>
          </p>
          <p>
            Character: <b>{character}</b>
          </p>
        </li>
      );
    }
  );

  return (
    <div className="cast-wrapper">
      <h2 className="page-title">Actors and Actresses</h2>
      <ul className="actors-list">{actorsList}</ul>
    </div>
  );
};

Cast.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.shape)
}
export default Cast;
