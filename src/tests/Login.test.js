import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const RADOM_EMAIL = 'RAMDOM@EMAIL.com';
const RADOM_PASSWORD = '1234567';
const LINK = '/foods';

describe('Teste a Tela de Login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('a página contém um campo de email e se é possivel ecrever um email', () => {
    const labelEmail = screen.getByLabelText(/email:/i);
    expect(labelEmail).toBeInTheDocument();

    userEvent.type(labelEmail, RADOM_EMAIL);
    expect(labelEmail).toHaveValue(RADOM_EMAIL);
  });

  it('a página contém um campo de senha e se é possivel ecrever uma senha', () => {
    const labelPassword = screen.getByLabelText(/senha:/i);
    expect(labelPassword).toBeInTheDocument();

    userEvent.type(labelPassword, RADOM_PASSWORD);
    expect(labelPassword).toHaveValue(RADOM_PASSWORD);
  });

  it('a página contém um botao "entrar" e se ele inicia desabilitado', () => {
    const btnSubmit = screen.getByRole('button', { name: /Entrar/i });
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();
  });

  it('o botao "entrar" é habilitado com um email e uma senha validos', () => {
    const labelEmail = screen.getByLabelText(/email:/i);
    userEvent.type(labelEmail, RADOM_EMAIL);

    const labelPassword = screen.getByLabelText(/senha:/i);
    userEvent.type(labelPassword, RADOM_PASSWORD);

    const btnSubmit = screen.getByRole('button', { name: /Entrar/i });
    expect(btnSubmit).not.toBeDisabled();
  });
});

test('o botao "entrar" muda a rota', () => {
  const { history } = renderWithRouter(<App />);

  const labelEmail = screen.getByLabelText(/email:/i);
  userEvent.type(labelEmail, RADOM_EMAIL);

  const labelPassword = screen.getByLabelText(/senha:/i);
  userEvent.type(labelPassword, RADOM_PASSWORD);

  const btnSubmit = screen.getByRole('button', { name: /Entrar/i });
  userEvent.click(btnSubmit);

  expect(history.location.pathname).toBe(LINK);
});
