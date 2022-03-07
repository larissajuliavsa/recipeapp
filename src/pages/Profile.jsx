import React from 'react';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <main>
      <p data-testid="profile-email">{user.email}</p>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </main>
  );
}

export default Profile;
