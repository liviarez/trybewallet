import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('teste a pagina do login', () => {
  it('Testa se a página de Login valida como esperado e se é direcionado para pagina de carteira', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const password = screen.getByPlaceholderText('Senha');
    expect(password).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'alguem@alguem.com');
    userEvent.type(passwordInput, 'password');
    userEvent.click(button);
    await waitFor(() => {
      const route = history.location.pathname;
      const userName = screen.queryByTestId('email-field');
      expect(route).toBe('/');
      expect(userName).toBeInTheDocument();
    });

    /*  expect(history.location.pathname).toBe('/'); */
  });
  it('Testa se a página mostra as despesas totais', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });
    const despesa = screen.getByTestId('total-field');
    expect(despesa).toBeInTheDocument();
  });
});
