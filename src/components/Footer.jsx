import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../assets/css/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="container-footer">
      <div className="footer-icons">
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            className="footer-drinks"
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explore">
          <img
            src={ exploreIcon }
            className="footer-explore"
            alt="explore"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/foods">
          <img
            src={ mealIcon }
            className="footer-foods"
            alt="meal"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
