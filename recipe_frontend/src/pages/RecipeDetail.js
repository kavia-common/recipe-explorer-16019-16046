import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faBookmark, 
  faClock,
  faArrowLeft,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './RecipeDetail.css';

// PUBLIC_INTERFACE
const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock recipe data - Replace with Supabase fetch
    const mockRecipe = {
      id: parseInt(id),
      title: 'Traditional spare ribs baked',
      image: 'https://source.unsplash.com/random/800x600?ribs',
      rating: 4.0,
      creator: 'Chef John',
      cookTime: '20 min',
      category: 'Dinner',
      isBookmarked: false,
      ingredients: [
        '2 lbs pork ribs',
        '1/4 cup brown sugar',
        '2 tbsp paprika',
        '1 tbsp garlic powder',
        '1 tbsp onion powder',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Preheat oven to 375°F (190°C)',
        'Mix all dry ingredients to create the rub',
        'Apply rub generously to both sides of the ribs',
        'Wrap ribs in foil and place on baking sheet',
        'Bake for 2-2.5 hours until tender',
        'Unwrap, brush with BBQ sauce if desired',
        'Broil for 3-5 minutes until caramelized'
      ],
      servings: 4,
      difficulty: 'Medium',
      calories: 450
    };

    setRecipe(mockRecipe);
    setLoading(false);
  }, [id]);

  const handleBookmark = async () => {
    if (!user) return;

    try {
      setRecipe(prev => ({
        ...prev,
        isBookmarked: !prev.isBookmarked
      }));

      // Implement bookmark functionality with Supabase
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing recipe:', recipe.title);
  };

  if (loading) {
    return <div className="loading">Loading recipe...</div>;
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Recipe Details</h1>
        <button className="share-btn" onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} />
        </button>
      </div>

      <div className="recipe-hero">
        <div className="recipe-image">
          <img src={recipe.image} alt={recipe.title} />
          <div className="recipe-overlay">
            <div className="rating">
              <FontAwesomeIcon icon={faStar} className="star" />
              <span>{recipe.rating.toFixed(1)}</span>
            </div>
            <button 
              className={`bookmark-btn ${recipe.isBookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </button>
          </div>
        </div>

        <div className="recipe-info">
          <h2>{recipe.title}</h2>
          <p className="creator">By {recipe.creator}</p>
          
          <div className="recipe-meta">
            <div className="meta-item">
              <FontAwesomeIcon icon={faClock} />
              <span>{recipe.cookTime}</span>
            </div>
            <div className="meta-item">
              <span>Servings: {recipe.servings}</span>
            </div>
            <div className="meta-item">
              <span>Difficulty: {recipe.difficulty}</span>
            </div>
            <div className="meta-item">
              <span>{recipe.calories} cal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <section className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="instructions">
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;
