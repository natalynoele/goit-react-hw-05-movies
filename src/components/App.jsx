import { Routes, Route, NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';


import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MovieDetails from 'pages/MovieDetails';
// import Cast from './cast/Cast';
// import Reviews from './reviews/Reviews';

const Cast = lazy(() => import('./cast/Cast'));
const Reviews = lazy(() => import('./reviews/Reviews'));

export const App = () => {  
  return (
    <div className="container">
      <header>
        <nav>
          <ul className="menu">
            <li className="menu_item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route
            path="cast"
            element={
              <Suspense>
                <Cast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};
