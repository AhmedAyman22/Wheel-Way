import React, { useState } from 'react';
import emptyStar from '../assets/images/empty-star.png';
import filledStar from '../assets/images/filled-star.png';

const RatingReview = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            key={star}
            className='star'
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setRating(star);
            }}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <img
              className='relative top-[20%] left-[150%] w-[55px]'
              src={hoverRating >= star || rating >= star ? filledStar : emptyStar}
              alt={`Star ${star}`}
            />
          </span>
        );
      })}
    </div>
  );
};

export default RatingReview;
