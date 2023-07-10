import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  handleDeleteExpClick = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  handleEditClick = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense({ id, editor: true }));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}

                </td>
                <td>{expense.currency}</td>
                <td>

                  <button
                    data-testid="delete-btn"
                    // callback para ser chamada apenas quando clicar e não só quando renderiza o codigo
                    onClick={ () => this.handleDeleteExpClick(expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditClick(expense.id) }
                  >
                    Editar despesa
                  </button>

                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Table);
