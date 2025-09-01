import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookmark, faPlus, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

// PUBLIC_INTERFACE
const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-brand">
          <Link to="/">Recipe Explorer</Link>
        </div>
        
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
          
          {user && (
            <>
              <Link to="/bookmarks" className={location.pathname === '/bookmarks' ? 'active' : ''}>
                <FontAwesomeIcon icon={faBookmark} />
                <span>Saved</span>
              </Link>
              
              <Link to="/create" className="create-recipe">
                <FontAwesomeIcon icon={faPlus} />
                <span>Create</span>
              </Link>
              
              <Link to="/notifications" className={location.pathname === '/notifications' ? 'active' : ''}>
                <FontAwesomeIcon icon={faBell} />
                <span>Notifications</span>
              </Link>
              
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </Link>
            </>
          )}
        </div>

        <div className="nav-auth">
          {user ? (
            <button className="btn btn-secondary" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <Link to="/auth" className="btn btn-primary">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
