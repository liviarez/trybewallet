import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesAPI } from '../redux/actions';

class WalletForm extends Component {
/*   INITIAL_STATE = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    id: 0,
  };
 */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label>
          Valor:
          <input
            type="number"
            name="value"
            data-testid="value-input"
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
          />
        </label>
        <label>
          Moeda:
          <select
            name="currency"
            data-testid="currency-input"
          >
            {currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
              >
                {currency}
              </option>))}

          </select>
        </label>
        <label>
          Método de Pagamento:
          <select
            name="method"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label>
          Categoria:
          <select
            name="category"
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

// Define quais partes do estado seraoa cessiveis ao componente props.
const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// quando for usar o estado global eu preciso usar esse connect
export default connect(mapStateToProps)(WalletForm);
