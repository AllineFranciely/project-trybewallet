import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchanges } from '../actions';

let index = 0;
const alimentos = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentos,
      disabled: true,
    };
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  onSubmitButton = () => {
    const { value, description, currency, method, tag } = this.state; // variável que vai alterar o estado.
    const { dispatchExpenses } = this.props; // chama função do dispach.
    const list = { // variável a ser passada para a função do dispatch, os valores após alterados devem ser salvos nela.
      id: index,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatchExpenses(list);
    index += 1; // após o dispatch receber a lista de variáveis o ID deve aumentar e por isso index +=1, index é o ID.
    this.setState({ // após a função salvar os dados, reseta os valores para o estado inicial.
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentos,
    });
  }

  handleChange = ({ target }) => { // desestrutura o target do objeto em 2 variáveis, name e value.
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton()); // retorna name: 'value', ou seja, passa o value como valor do name. A estrutra altera dinamicamente a chave [name].
    // chama como callback a função de validação
  }

  validateButton = () => {
    const { value, currency, description, method, tag } = this.state;
    if (value && currency && description && method && tag) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, currency, description, method, tag, disabled } = this.state;
    const totalExpenses = expenses.reduce((acc, curr) => {
      acc += curr.value * parseFloat(curr.exchangeRates[curr.currency].ask);
      return acc;
    }, 0);
    return (
      <div>
        <header>
          <h2>TrybeWallet</h2>
          <p>E-mail:</p>
          <p data-testid="email-field">{ email }</p>
          <p>Despesas totais:</p>
          <p data-testid="total-field">{ totalExpenses.toFixed(2) }</p>
          <p>Moeda:</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            <b>Valor:</b>
            <input
              type="number"
              name="value"
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            <b>Descrição:</b>
            <input
              type="text"
              name="description"
              data-testid="description-input"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            <b>Moeda:</b>
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((item) => <option key={ item }>{item}</option>) }
            </select>
          </label>
          <label htmlFor="method">
            <b>Método de pagamento:</b>
            <select
              id="method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <b>Categoria:</b>
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          data-testid="edit-button-save"
          type="button"
          disabled={ disabled }
          onClick={ this.onSubmitButton }
        >
          Adicionar despesa
        </button>
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
        </table>
      </div>

    );
  }
}

// <tr> define uma linha de células na tabela. <th> É para definir a célula de cabeçalho.
// Documentação utilizada para pesquisa:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(fetchCurrencies()),
  dispatchExpenses: (list) => dispatch(fetchExchanges(list)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  setCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
