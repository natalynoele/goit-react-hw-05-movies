import { useEffect, useState } from 'react';
import MoviesList from 'components/MoviesList';
import getMovies from 'service/getMovies';


const Home = () => {
   const endpoint = '/trending/movie/day';
   const [movies, setMovies] = useState([]);

  useEffect(() => {
      getMovies(endpoint).then(response => {
        setMovies(response.results);
      });
    }, []);
 
  return (
    <>
      <h1>Trending films</h1>
      <MoviesList movies={ movies} />
    </>
  );
};

export default Home;
