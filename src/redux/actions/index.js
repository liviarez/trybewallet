// ACTIONS TYPES - suporte na mentoria.(20/06)
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITANDO_EXPENSE = 'EDITANDO_EXPENSE';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export const removeExpense = (expenses) => ({
  type: REMOVE_EXPENSE,
  payload: expenses,
});

export const editExpense = (expenses) => ({
  type: EDIT_EXPENSE,
  payload: expenses,
});

export const editandoItem = (expenses) => ({
  type: EDITANDO_EXPENSE,
  payload: expenses,
});

export const getCurrenciesAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(getCurrencies(currencies));
  /*  console.log('currencies', currencies); */
  return currencies;
};

export const getExpenses = (expenses) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  /*   console.log('data', data); */
  dispatch(addExpenses({ ...expenses, exchangeRates: data }));
};
