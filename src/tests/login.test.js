import React from 'react';
import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import Login from '../pages/Login';
import App from '../App';
/* import { act } from 'react-dom/test-utils'; */
/* import App from '../App'; */

describe('Testa o componente <Login.js />', () => {
  it('Teste se a página de Login é renderizada', () => {
    renderWithRouter(<Login />);
    const emailValue = screen.getAllByTestId('email-input');
    expect(emailValue).toBeInTheDocument();

    const passwordValue = screen.getAllByTestId('password-input');
    expect(passwordValue).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const { history } = renderWithRouter(<App />);
    const loginLink = screen.getByRole('link', { name: 'Home' });
    expect(loginLink).toBeInTheDocument();

    userEvent.click(loginLink);

    expect(history.location.pathname).toBe('/');
  });
});
