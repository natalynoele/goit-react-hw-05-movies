import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import BASE_URL from 'service/baseUrl';
import API_KEY from 'service/apiKey';
import MoviesList from 'components/MoviesList';

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [errorInfo, setErrorInfo] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  async function getList(query) {
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&page=1&query=${query}`
      );
      if (response.data.total_results === 0) {
        setErrorInfo(
          `Sorry, we don't have the movie with the title '${query}'`
        );
      }
      setMoviesList(response.data.results);     
    } catch (error) {
      setErrorInfo(error.message);
    }
  }
  useEffect(() => {
    if (!query) {
      return;
    }
    getList(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    getList(query);
    form.reset();
  }; 
 
   return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
             name="query"
            
            placeholder="Search movies"
            onChange={e => setSearchParams({ query: e.target.value })}
          />
          <button type="submit" className="SearchForm-button">
            Search
          </button>
        </form>
      </header>
       {moviesList.length > 0 && <MoviesList movies={moviesList} />}
      {errorInfo && <p className="errorInfo">{errorInfo}</p>}
    </>
  );
};

Movies.propTypes = {
  errorInfo: PropTypes.string,
  moviesList: PropTypes.arrayOf(PropTypes.shape),
};
export default Movies;
