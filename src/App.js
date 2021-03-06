import React from 'react';
import { Route, Switch } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';
import Home from './pages/Home';
import DetailsFood from './pages/DetailsFood';
import DetailsDrink from './pages/DetailsDrink';
import Done from './pages/Done';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Explorer from './pages/Explorer';
import ExplorerTypes from './pages/ExplorerTypes';
import ExplorerIngredients from './pages/ExplorerIngredients';
import NotFound from './pages/NotFound';
import ExplorerNationalities from './pages/ExplorerNationalities';
import './assets/css/App.css';
import InProgress from './pages/InProgress';

function App() {
  return (
    <div className="meals">
      <RecipeProvider>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route exact path="/foods" component={ Home } />
          <Route exact path="/foods/:id" component={ DetailsFood } />
          <Route exact path="/drinks/:id" component={ DetailsDrink } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route
            exact
            path="/foods/:id"
            render={ (props) => <DetailsFood { ...props } /> }
          />
          <Route
            exact
            path="/drinks/:id"
            render={ (props) => <DetailsDrink { ...props } /> }
          />
          <Route
            exact
            path="/:foodsAndDrinks/:id/in-progress"
            render={ (props) => <InProgress { ...props } /> }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ Done } />
          <Route exact path="/favorite-recipes" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/explore" render={ (props) => <Explorer { ...props } /> } />
          <Route
            exact
            path="/explore/:foodsAndDrinks"
            render={ (props) => <ExplorerTypes { ...props } /> }
          />
          <Route
            exact
            path="/explore/:foodsAndDrinks/ingredients"
            render={ (props) => <ExplorerIngredients { ...props } /> }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExplorerNationalities }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </RecipeProvider>
    </div>
  );
}

export default App;
