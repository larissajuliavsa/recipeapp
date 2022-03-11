import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';
import App from '../App';
import Home from '../pages/Home';
// import Details from '../pages/Details';
// import InProgress from '../pages/InProgress';
// import Explorer from '../pages/Explorer';
// import Profile from '../pages/Profile';
import Done from '../pages/Done';
import Favorites from '../pages/Favorites';

describe('Testa o componente Footer', () => {
  it('o componente contém um conjunto fixo de botões',
    () => {
      RenderWithRouter(<Footer />);

      const drink = screen.getByRole('img', { name: /drink/i });
      expect(drink).toHaveAttribute('src', 'drinkIcon.svg');

      const explore = screen.getByRole('img', { name: /explore/i });
      expect(explore).toHaveAttribute('src', 'exploreIcon.svg');

      const meal = screen.getByRole('img', { name: /meal/i });
      expect(meal).toHaveAttribute('src', 'mealIcon.svg');
    });

  it('cada botão redireciona para uma rota específica',
    () => {
      const { history } = renderWithRouter(<Footer />);

      const drink = screen.getByRole('img', { name: /drink/i });
      userEvent.click(drink);
      expect(history.location.pathname).toBe('/drinks');

      const explore = screen.getByRole('img', { name: /explore/i });
      userEvent.click(explore);
      expect(history.location.pathname).toBe('/explore');

      const meal = screen.getByRole('img', { name: /meal/i });
      userEvent.click(meal);
      expect(history.location.pathname).toBe('/foods');
    });

  it('o componente Footer não deve estar presente na tela de Login',
    () => {
      RenderWithRouter(<App />);
      const footer = screen.queryByTestId('footer');
      expect(footer).not.toBeInTheDocument();
    });

  it('o componente Footer deve estar presente na tela Home',
    () => {
      RenderWithRouter(<Home />);
      const footer = screen.queryByTestId('footer');
      expect(footer).toBeInTheDocument();
    });

  // it('o componente Footer não deve estar presente na tela de Detalhes da Receita',
  //   () => {
  //     RenderWithRouter(<Details />);
  //     const footer = screen.queryByTestId('footer');
  //     expect(footer).not.toBeInTheDocument();
  //   });

  // it('o componente Footer não deve estar presente na tela de Receitas em Progresso',
  //   () => {
  //     RenderWithRouter(<InProgress />);
  //     const footer = screen.queryByTestId('footer');
  //     expect(footer).not.toBeInTheDocument();
  //   });

  // it('o componente Footer deve estar presente na tela Explorar',
  //   () => {
  //     RenderWithRouter(<Explorer />);
  //     const footer = screen.queryByTestId('footer');
  //     expect(footer).toBeInTheDocument();
  //   });

  // it('o componente Footer deve estar presente na tela de Perfil',
  //   () => {
  //     RenderWithRouter(<Profile />);
  //     const footer = screen.queryByTestId('footer');
  //     expect(footer).toBeInTheDocument();
  //   });

  it('o componente Footer não deve estar presente na tela de Receitas Feitas',
    () => {
      RenderWithRouter(<Done />);
      const footer = screen.queryByTestId('footer');
      expect(footer).not.toBeInTheDocument();
    });

  it('o componente Footer não deve estar presente na tela de Receitas Favoritas',
    () => {
      RenderWithRouter(<Favorites />);
      const footer = screen.queryByTestId('footer');
      expect(footer).not.toBeInTheDocument();
    });
});
