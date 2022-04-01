import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  render() {
    const { email, currencies } = this.props;
    const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categorias = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <div>
        <header>
          <h2>TrybeWallet</h2>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field"> 0 </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              id="valor"
              name="valor"
              type="number"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              id="descricao"
              name="descricao"
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              name="moeda"
              id="moeda"
            >
              {currencies.map((currency) => <option key={ currency }>{currency}</option>)}
            </select>
          </label>
          <label htmlFor="metodos">
            Método de pagamento:
            <select
              name="metodos"
              id="metodos"
              data-testid="method-input"
            >
              {metodos.map((metodo) => <option key={ metodo }>{metodo}</option>)}
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
            >
              {categorias.map((categoria) => <option key={ categoria }>{categoria}</option>)}
            </select>
          </label>
          <button
            data-testid="edit-button-save"
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  setCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
