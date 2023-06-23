/* import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente <Login.js />', () => {
  it('Teste se a página de Login é renderizada e depois direcionada para a páina de carteira', () => {
    renderWithRouterAndRedux(<Login />);
    const emailValue = screen.getAllByTestId('email-input');
    expect(emailValue).toBeInTheDocument();

    const passwordValue = screen.getAllByTestId('password-input');
    expect(passwordValue).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const { history } = renderWithRouterAndRedux(<App />);
    userEvent.type(passwordValue, '123456');
    userEvent.type(emailValue, 'teste@teste.com');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
 */
