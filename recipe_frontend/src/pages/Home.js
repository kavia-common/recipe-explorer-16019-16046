import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import FilterModal from '../components/FilterModal';
import './Home.css';

// PUBLIC_INTERFACE
const Home = () => {
  const { user, supabase } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    timeFilter: 'All',
    ratingFilter: null,
    categoryFilter: 'All'
  });

  // Mock recipes data - Replace with Supabase fetch
  const mockRecipes = [
    {
      id: 1,
      title: 'Traditional spare ribs baked',
      image: 'https://source.unsplash.com/random/400x300?ribs',
      rating: 4.0,
      creator: 'Chef John',
      cookTime: '20 min',
      category: 'Dinner',
      isBookmarked: false
    },
    // Add more mock recipes...
  ];

  useEffect(() => {
    setRecipes(mockRecipes);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const applyFilters = () => {
    // Implement filter logic
    console.log('Applying filters:', filters);
    setIsFilterOpen(false);
  };

  const handleBookmark = async (recipeId) => {
    if (!user) return;

    try {
      // Toggle bookmark in state
      setRecipes(prev => prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, isBookmarked: !recipe.isBookmarked }
          : recipe
      ));

      // Update in Supabase
      // Implement bookmark functionality with Supabase
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <div className="search-input-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button
            type="button"
            className="filter-btn"
            onClick={() => setIsFilterOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </form>
      </div>

      {loading ? (
        <div className="loading">Loading recipes...</div>
      ) : (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={applyFilters}
      />
    </div>
  );
};

export default Home;
