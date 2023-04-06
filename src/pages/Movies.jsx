import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import BASE_URL from 'baseUrl';
import API_KEY from 'service/apiKey';
import axios from 'axios';
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
        setErrorInfo(`Sorry, we don't have the movie with the title '${query}'`);
      }
      setMoviesList(response.data.results);    
    } catch (error) {
      setErrorInfo(error.message);     
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    getList(query);
    form.reset();
  };

  useEffect(() => {
    if (!query || query === null) {
   return
    }
    getList(query);
},[])

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
      {errorInfo && <p className='errorInfo'>{ errorInfo}</p>}
    </>
  );
};

export default Movies;
