import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBookmark, faClock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

// PUBLIC_INTERFACE
const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('recipes');

  const mockRecipes = [
    {
      id: 1,
      title: 'Traditional spare ribs baked',
      image: 'https://source.unsplash.com/random/400x300?ribs',
      rating: 4.0,
      creator: 'Chef John',
      cookTime: '20 min'
    },
    {
      id: 2,
      title: 'Spice roasted chicken with flavored rice',
      image: 'https://source.unsplash.com/random/400x300?chicken',
      rating: 4.0,
      creator: 'Mark Kelvin',
      cookTime: '20 min'
    },
    {
      id: 3,
      title: 'Spicy fried rice mix chicken bali',
      image: 'https://source.unsplash.com/random/400x300?rice',
      rating: 4.0,
      creator: 'Spicy Nelly',
      cookTime: '20 min'
    }
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button className="menu-button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="profile-info">
        <div className="profile-image">
          <img 
            src={user?.user_metadata?.avatar_url || 'https://via.placeholder.com/100'} 
            alt="Profile" 
          />
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="label">Recipe</span>
            <span className="value">4</span>
          </div>
          <div className="stat-item">
            <span className="label">Followers</span>
            <span className="value">2.5M</span>
          </div>
          <div className="stat-item">
            <span className="label">Following</span>
            <span className="value">259</span>
          </div>
        </div>

        <div className="profile-details">
          <h2>{user?.user_metadata?.full_name || 'Food Lover'}</h2>
          <span className="role">Chef</span>
          <p className="bio">
            Passionate about food and life 🥘🍲🍝🍱<br/>
            Private Chef<br/>
            More...
          </p>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          Recipe
        </button>
        <button 
          className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
        <button 
          className={`tab ${activeTab === 'tagged' ? 'active' : ''}`}
          onClick={() => setActiveTab('tagged')}
        >
          Tagged
        </button>
      </div>

      <div className="recipe-grid">
        {mockRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div className="card-image" style={{ backgroundImage: `url(${recipe.image})` }}>
              <div className="card-overlay">
                <div className="rating">
                  <FontAwesomeIcon icon={faStar} className="star" />
                  <span>{recipe.rating}</span>
                </div>
                <button className="bookmark-btn">
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
              </div>
            </div>
            <div className="card-content">
              <h3>{recipe.title}</h3>
              <p className="creator">By {recipe.creator}</p>
              <div className="cook-time">
                <FontAwesomeIcon icon={faClock} />
                <span>{recipe.cookTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
