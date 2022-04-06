import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchanges } from '../actions';
import './Wallet.css';

let index = 0; // criação de variável por causa do lint.
const alimentos = 'Alimentação'; // criação de variável por causa do lint.

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentos, // retorna a const alimentos.
      disabled: true,
    };
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  onSubmitButton = () => {
    const { value, description, currency, method, tag } = this.state; // variável utilizada para criar o list da forma como tiver no estado.
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
    const { email, currencies, expenses } = this.props; // o expenses é um array devido especificação do reducer.
    const { value, currency, description, method, tag, disabled } = this.state;
    const totalExpenses = expenses.reduce((acc, curr) => { // função para somar as despesas totais. Acc é o valor atual e curr o valor que vem em seguida.
      acc += curr.value * parseFloat(curr.exchangeRates[curr.currency].ask); // [] significa index. exchangeRates e ask vêm do objeto expenses e são as chaves que quero usar.
      return acc; // parseFloat transforma em número. O acc += é para acrescentar os valores do pŕoximo item. curr.value pega a chave value do objeto atual * curr.exchangesRates retorna um objeto de objetos com as currency.
    }, 0); // o 0 é o valor inicial do acc. O curr.currency verifica qual a moeda acessar o .ask e o .ask acessa achave requisitada no requisito.
    return (
      <div>
        <header className="header">
          <h3 className="trybewallet">TrybeWallet</h3>
          <div className="email">
            <p>E-mail:</p>
            <p data-testid="email-field">{ email }</p>
          </div>
          <div className="despesas">
            <p>Despesas totais:</p>
            <p data-testid="total-field">{ totalExpenses.toFixed(2) }</p>
          </div>
          <div className="moeda">
            <p>Moeda:</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <form className="formValor">
          <label htmlFor="value">
            <b className="discriminação">Valor:</b>
            <input
              className="valor"
              type="number"
              name="value"
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            <b className="discriminação">Descrição:</b>
            <input
              className="descrição"
              type="text"
              name="description"
              data-testid="description-input"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            <b className="discriminação">Moeda:</b>
            <select
              className="moedaseleção"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((item) => <option key={ item }>{item}</option>) }
            </select>
          </label>
          <label htmlFor="method">
            <b className="discriminação">Método de pagamento:</b>
            <select
              className="metodo"
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
            <b className="discriminação">Categoria:</b>
            <select
              className="categoria"
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
          className="adicionar"
          data-testid="edit-button-save"
          type="button"
          disabled={ disabled }
          onClick={ this.onSubmitButton }
        >
          Adicionar despesa
        </button>
        <table className="tabela">
          <thead className="headtable">
            <tr>
              <th className="th">Descrição</th>
              <th className="th">Tag</th>
              <th th className="th">Método de pagamento</th>
              <th th className="th">Valor</th>
              <th th className="th">Moeda</th>
              <th th className="th">Câmbio utilizado</th>
              <th th className="th">Valor convertido</th>
              <th th className="th">Moeda de conversão</th>
              <th th className="th">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="bodytable">
            {expenses.map((expense) => (
              <tr key={ expense.description }>
                <td className="td">{ expense.description }</td>
                <td className="td">{ expense.tag }</td>
                <td className="td">{ expense.method }</td>
                <td className="td">{ Number(expense.value).toFixed(2) }</td>
                <td className="td">{ (expense.exchangeRates[expense.currency].name) }</td>
                <td className="td">
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td className="td">
                  { (Number(expense.exchangeRates[expense.currency].ask)
                  * expense.value).toFixed(2) }
                </td>
                <td className="td">Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );
  }
}

// expense.exchangeRates[expense.currency].name: acessa a chave exchandeRates da moeda expense do map, puxa a chave currency (moeda) do meu expense da echangeRates e acessa e retorna a chave name.
// Number(expense.exchangeRates[expense.currency].ask: Number para transformar em número. Agora a cessa e retorna a chave ask da currency da exhangeRates da expense.
// (Number(expense.exchangeRates[expense.currency].ask) * expense.value).toFixed(2): Number para transformar em número. Multiplica e retorna o valor do ask da currency da exchengeRates da expense pelo value da expense.

// <tr> define uma linha de células na tabela. <th> É para definir a célula de cabeçalho e <tb> as células de corpo.
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
