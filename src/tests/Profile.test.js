import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
// import Profile from '../pages/Profile';
import App from '../App';

const RADOM_EMAIL = 'RAMDOM@EMAIL.com';
const MOCK_PASSWORD = '1234567';
const BTN_LENGTH = 3;

describe('Testar a página Profile', () => {
  it('Teste se a página contém o email do localStorage', () => {
    const { history } = RenderWithRouter(<App />);

    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');
    const btnLogin = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, RADOM_EMAIL);
    userEvent.type(inputPassword, MOCK_PASSWORD);
    userEvent.click(btnLogin);

    history.push('/profile');

    expect(screen.getByText(RADOM_EMAIL)).toBeInTheDocument();
  });

  it('Teste se a página contém três botões', () => {
    const { history } = RenderWithRouter(<App />);

    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');
    const btnLogin = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, RADOM_EMAIL);
    userEvent.type(inputPassword, MOCK_PASSWORD);
    userEvent.click(btnLogin);

    history.push('/profile');
    expect(screen.getAllByRole('button')).toHaveLength(BTN_LENGTH);
  });

  it('Teste se o botão Done Recipes vai para a rota /done-recipes', () => {
    const { history } = RenderWithRouter(<App />);

    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');
    const btnLogin = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, RADOM_EMAIL);
    userEvent.type(inputPassword, MOCK_PASSWORD);
    userEvent.click(btnLogin);

    history.push('/profile');

    const btnDone = screen.getByTestId('profile-done-btn');

    userEvent.click(btnDone);
    history.push('/done-recipes');
    expect(screen.getByText('Rota Done Recipes')).toBeInTheDocument();
  });

  it('Teste se o botão Favorite Recipes vai para a rota /favorites-recipes', () => {
    const { history } = RenderWithRouter(<App />);

    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');
    const btnLogin = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, RADOM_EMAIL);
    userEvent.type(inputPassword, MOCK_PASSWORD);
    userEvent.click(btnLogin);

    history.push('/profile');

    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);
    history.push('/favorite-recipes');
    expect(screen.getByText('Rota Favorites Recipes')).toBeInTheDocument();
  });

  it('Teste se o botão Logout vai para a rota /', () => {
    const { history } = RenderWithRouter(<App />);

    const inputEmail = screen.getByLabelText('Email:');
    const inputPassword = screen.getByLabelText('Senha:');
    const btnLogin = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, RADOM_EMAIL);
    userEvent.type(inputPassword, MOCK_PASSWORD);
    userEvent.click(btnLogin);

    history.push('/profile');

    const btnFavorite = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnFavorite);
    history.push('/');
  });
});
