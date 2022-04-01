// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES:
    return {
      ...state, // não altera o currencies
      expenses: [...state.expenses, action.payload], // mas altera a chave expenses. o spread operator salva o primeiro estado para gerar o novo e atualizar o ID.
    };
  default:
    return state;
  }
};

export default wallet;
