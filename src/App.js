import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Profile from './pages/Profile';

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;
