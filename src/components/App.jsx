import { Routes, Route, NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MovieDetails from 'pages/movie/MovieDetails';

const Cast = lazy(() => import('../pages/cast/Cast'));
const Reviews = lazy(() => import('../pages/reviews/Reviews'));

export const App = () => {  
  return (
    <div className="container">
      <header>
        <nav>
          <ul className="menu">
            <li className="menu-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="menu-item">
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
