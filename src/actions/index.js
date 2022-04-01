// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const CURRENCIES = 'CURRENCIES';
export const EXPENSES = 'EXPENSES';

export const makeLogin = (email) => ({
  type: LOGIN,
  email,
});

export const requestWallet = (payload) => ({
  type: CURRENCIES,
  payload,
});

export const listExpenses = (payload) => ({
  type: EXPENSES,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currenciesFetch = Object.keys(data).filter((item) => item !== 'USDT');
  dispatch(requestWallet(currenciesFetch));
};

// Object.keys transforma meu objeto (objectCurrencies) em um array (arrayCurrencies) para permitir usar o filter.

/* documentação utilizada para estudo do Object.keys:
 https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/keys */

export const fetchExchanges = (list) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  listExpenses.exchangeRates = data;
  dispatch(listExpenses(list));
};
