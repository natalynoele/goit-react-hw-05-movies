import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import getMovies from 'service/getMovies';
import female from '../../images/female.jpg';
import male from '../../images/male.jpg';

const Cast = () => {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  const endpoint = `/movie/${movieId}/credits`;
   const location = useLocation();

  useEffect(() => {
    getMovies(endpoint).then(response => {
      setActors(response.cast);
    });
  }, []);

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
      <h3>Actors and actresses</h3>
      <ul className="actorsList">{actorsList}</ul>
    </div>
  );
};

export default Cast;
