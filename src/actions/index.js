// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const CURRENCIES = 'CURRENCIES';

export const makeLogin = (email) => ({
  type: LOGIN,
  email,
});

export const requestCurrencies = (payload) => ({
  type: CURRENCIES,
  payload,
});
