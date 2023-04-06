import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ movies }) => {
  const location = useLocation();
   return (
    <>
      {movies.length > 0 && (
        <ul className='moviesList'>
          {movies.map(({ id, title }) => {
            return (
              <li key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  <p>{title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MoviesList;
