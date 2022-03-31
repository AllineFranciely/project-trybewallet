// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state, // recupera o state
      email: action.email, // altera a chave user para o retorno da action.payload
    };
  default:
    return state;
  }
};

export default user;
