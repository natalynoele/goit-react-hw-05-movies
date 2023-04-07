import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMovies from 'service/getMovies';

const Reviews = () => {
  const { movieId } = useParams();
  const endpoint = `/movie/${movieId}/reviews`;
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getMovies(endpoint).then(response => setReviews(response.results));
 });

  const reviewsList = reviews
    ? reviews.map(({ author, content, created_at, id }) => {
        return (
          <li key={id} className='reviews-item'>
            <p>
              <b>{author}</b>
            </p>
            <p>{content}</p>
          </li>
        );
      })
    : [];
  
  if (reviewsList.length > 0) {
    return (
      <>
        <h2 className='page-title'>Audience reviews</h2>
        <ul className='reviews-list'>{reviewsList}</ul>
      </>
    );
  } else {
    return <p>There are no reviews for this film yet </p>;
  }
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape)
}
export default Reviews;
