import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();

  function getEmail() {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
    return '';
  }

  function logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <main>
      <p data-testid="profile-email">{getEmail()}</p>
      <Header title="Profile" />
      <Footer />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button type="button" data-testid="profile-logout-btn" onClick={ logout }>
        Logout
      </button>
    </main>
  );
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
