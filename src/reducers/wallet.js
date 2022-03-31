// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      wallet: action.payload,
      currencies: action.payload,
    };
  default:
    return state;
  }
};
export default wallet;
