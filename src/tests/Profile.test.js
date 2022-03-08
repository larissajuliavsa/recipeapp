import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import Profile from '../pages/Profile';
import App from '../App';

const MOCK_EMAIL = 'teste@teste.com';
const MOCK_PASSWORD = '1234567';
const BTN_LENGTH = 3;

describe('Testar a página Profile', () => {
  it.only('Teste se a página contém o email do localStorage', () => {
    const { history, debug } = renderWithRouter(<App />);
    // history.push('/');
    
    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');
    const btnLogin = screen.getByRole('button', { name: 'Entrar' });
    // const emailText = screen.getByText(MOCK_EMAIL);

    userEvent.type(inputEmail, MOCK_EMAIL);
    userEvent.type(inputPassword, MOCK_PASSWORD);
    
    userEvent.click(btnLogin);
    debug();
    history.push('/profile');
    console.log(localStorage.getItem('user'));
    // expect(screen.getByText(MOCK_EMAIL)).toBeInTheDocument();
    // expect(screen.getByText(MOCK_EMAIL)).toBeInTheDocument();
  });

  it('Teste se a página contém três botões', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(screen.getByRole('button')).toHaveLength(BTN_LENGTH);
  });

  it('Teste se o botão Done Recipes vai para a rota /done-recipes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const btnDone = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(btnDone);
    history.push('/done-recipes');
    expect(screen.getByText(/rota done recipes/i)).toBeInTheDocument();
  });

  it('Teste se o botão Favorite Recipes vai para a rota /favorites-recipes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const btnFavorite = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(btnFavorite);
    history.push('/favorite-recipes');
    expect(screen.getByText(/rota favorites recipes/i)).toBeInTheDocument();
  });

  it('Teste se o botão Logout vai para a rota /', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const btnLogout = screen.getByRole('button', { name: /logout/i });

    userEvent.click(btnLogout);
    history.push('/');
  });
});
