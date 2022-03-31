import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validateEmail: false,
    };
  }

  validateEmail = () => {
    const { email, password } = this.state;
    const validEmail = email.match(/[\w.!#$%&'*+=?^_`{|}~-]+@[\w.-]+\.[A-Z]{2,}/gmi);
    const minLength = 6;
    const validPass = password.length >= minLength;
    this.setState({ validateEmail: validEmail && validPass });
  }

  handleChange = ({ target: { name, value } }) => { // desestrutura o target do objeto em 2 variáveis, name e value.
    this.setState({
      [name]: value }, () => { // retorna name: 'value', ou seja, passa o value como valor do name. A estrutra altera dinamicamente a chave [name].
      this.validateEmail(); // chama como callback a função de validação
    });
  }

  submitClick = () => {
    const { history, setMakeLogin } = this.props;
    const { email } = this.state;

    setMakeLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, validateEmail } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            onChange={ this.handleChange }
            value={ email }
            placeholder="E-mail"
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ this.handleChange }
            value={ password }
            placeholder="Senha"
          />
          <button
            type="button"
            onClick={ this.submitClick }
            disabled={ !validateEmail }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setMakeLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setMakeLogin: (email) => dispatch(makeLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
