// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state, // recupera o state
      wallet: action.payload, // altera a chave user para o retorno da action.payload
    };
  default:
    return state;
  }
};

export default wallet;
