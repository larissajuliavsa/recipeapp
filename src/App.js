import React from 'react';
import { Route, Switch } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';
import Home from './pages/Home';
import DetailsFood from './pages/DetailsFood';
import DetailsDrink from './pages/DetailsDrink';
import Done from './pages/Done';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Explorer from './pages/Explorer';
import ExplorerTypes from './pages/ExplorerTypes';

function App() {
  return (
    <RecipeProvider>
      <span>Hello Word!</span>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/foods" component={ Home } />
        <Route exact path="/foods/:id" component={ DetailsFood } />
        <Route exact path="/drinks/:id" component={ DetailsDrink } />
        <Route exact path="/done-recipes" component={ Done } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
