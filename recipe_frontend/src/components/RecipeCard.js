import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBookmark, faClock } from '@fortawesome/free-solid-svg-icons';
import './RecipeCard.css';

// PUBLIC_INTERFACE
const RecipeCard = ({ recipe, onBookmark }) => {
  const { id, title, image, rating, creator, cookTime, isBookmarked } = recipe;

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${id}`} className="card-link">
        <div className="card-image" style={{ backgroundImage: `url(${image})` }}>
          <div className="card-overlay">
            <div className="rating">
              <FontAwesomeIcon icon={faStar} className="star" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <button 
              className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onBookmark(id);
              }}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </button>
          </div>
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <p className="creator">By {creator}</p>
          <div className="cook-time">
            <FontAwesomeIcon icon={faClock} />
            <span>{cookTime}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
