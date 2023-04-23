import React from 'react';
import StarRatings from 'react-star-ratings';

const Rating = ({ rating, changeRating }) => {
  return (
    <StarRatings
      rating={rating}
      changeRating={changeRating}
      numberOfStars={5}
      starDimension="25px"
      starSpacing="3px"
      starRatedColor="teal"
    />
  );
};

export default Rating;
