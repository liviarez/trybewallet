import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">
          {
            expenses.reduce((accumulator, currentValue) => accumulator
            + currentValue.value
            * currentValue.exchangeRates[currentValue.currency].ask, 0).toFixed(2)
          }

        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return { email: state.user.email,
    wallet: state.wallet,
    expenses: state.wallet.expenses };
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default connect(mapStateToProps)(Header);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// ask é uma chave da API
// toFixed(2) propriedade para manter 2 casas apos a virgula
