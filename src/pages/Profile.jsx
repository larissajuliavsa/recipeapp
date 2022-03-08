import React from 'react';
import PropTypes from 'prop-types';

function Profile({ history }) {
  const user = JSON.parse(localStorage.getItem('user'));

  function logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <main>
      <p data-testid="profile-email">{user.email}</p>
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
