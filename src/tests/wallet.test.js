import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa o componente <WalletForm.js />', () => {
  it('Teste se os elementos sao renderizados corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const tagInput = screen.getByTestId('tag-input');
    const methodInput = screen.getByTestId('method-input');
    const addButton = screen.getByText('Adicionar despesa');
    userEvent.type(valueInput, '1000');
    userEvent.type(description, 'uma descricao qualquer');
    userEvent.type(currencyInput, 'USD');
    userEvent.type(tagInput, 'Saude');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.click(addButton);

    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
  });
});
