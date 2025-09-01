import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import './FilterModal.css';

// PUBLIC_INTERFACE
const FilterModal = ({ isOpen, onClose, filters, onFilterChange, onApply }) => {
  if (!isOpen) return null;

  const { timeFilter, ratingFilter, categoryFilter } = filters;

  const timeOptions = ['All', 'Newest', 'Oldest', 'Popularity'];
  const ratingOptions = [5, 4, 3, 2, 1];
  const categoryOptions = [
    'All', 'Cereal', 'Vegetables', 'Dinner', 'Local Dish',
    'Fruit', 'Breakfast', 'Lunch', 'Spanish', 'Chinese'
  ];

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <div className="filter-header">
          <h2>Filter Search</h2>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="filter-section">
          <h3>Time</h3>
          <div className="filter-options">
            {timeOptions.map(option => (
              <button
                key={option}
                className={`filter-btn ${timeFilter === option ? 'active' : ''}`}
                onClick={() => onFilterChange('timeFilter', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Rate</h3>
          <div className="filter-options">
            {ratingOptions.map(rating => (
              <button
                key={rating}
                className={`filter-btn ${ratingFilter === rating ? 'active' : ''}`}
                onClick={() => onFilterChange('ratingFilter', rating)}
              >
                <span>{rating}</span>
                <FontAwesomeIcon icon={faStar} className="star" />
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Category</h3>
          <div className="filter-options category-options">
            {categoryOptions.map(category => (
              <button
                key={category}
                className={`filter-btn ${categoryFilter === category ? 'active' : ''}`}
                onClick={() => onFilterChange('categoryFilter', category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <button className="apply-filter-btn" onClick={onApply}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
