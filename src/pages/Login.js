import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isLoginButtonDisabled: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyLoginComponent());
  };

  verifyLoginComponent = () => {
    const { email, password } = this.state;
    const minimiumCharacters = 6;
    const verifyPassword = password.length >= minimiumCharacters;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const verifyEmail = emailRegex.test(email);
    this.setState({
      isLoginButtonDisabled: verifyPassword && verifyEmail,
    });
  };

  handleClick = () => {
    const { email } = this.state;
    // função para enviar para o estado global, espera receber uma action
    const { dispatch, history } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isLoginButtonDisabled } = this.state;
    return (
      <form>
        <input
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          name="password"
          value={ password }
          onChange={ this.handleChange }
          placeholder="Senha"
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ !isLoginButtonDisabled }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape(
    { push: PropTypes.func.isRequired },
  ).isRequired,

};
// quando for usar o estado global eu preciso usar esse connect
export default connect()(Login);
