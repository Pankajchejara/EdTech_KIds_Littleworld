// SingleStarRating.jsx
import React from 'react';

const StarRating = ({ star }) => {
  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= star; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 fill-current">
          ★ 
        </span>
      );
    }
    
    return stars;
  };

  return <div>{renderStarRating()}</div>;
};

export default StarRating;
