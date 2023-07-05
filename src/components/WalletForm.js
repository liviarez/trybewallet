import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesAPI, getExpenses, editandoItem } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleExpensesClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    // this.state eu chamo o estado completo ao inves de escrever um a um
    dispatch(getExpenses(this.state));
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    dispatch(editandoItem(this.state));
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form>
        <label>
          Valor:
          <input
            type="number"
            value={ value }
            name="value"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Moeda:
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((curr) => (
              <option
                key={ curr }
                value={ curr }
              >
                {curr}
              </option>))}

          </select>
        </label>
        <label>
          Método de Pagamento:
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label>
          Categoria:
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { !editor
          ? (
            <button
              type="button"
              onClick={ this.handleExpensesClick }
            >
              Adicionar despesa
            </button>
          )
          : (
            <button
              type="button"
              data-testid="edit-btn"
              onClick={ this.handleEditClick }
            >
              Editar despesa
            </button>
          )}
      </form>
    );
  }
}

// Define quais partes do estado seraoa cessiveis ao componente props.
const mapStateToProps = (state) => ({ currencies: state.wallet.currencies,
  editor: state.wallet.editor });

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

// quando for usar o estado global eu preciso usar esse connect
export default connect(mapStateToProps)(WalletForm);
