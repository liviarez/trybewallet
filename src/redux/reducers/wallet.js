import { GET_CURRENCIES,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  EDITANDO_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state, currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      // ...state.expenses é o que ja existia. Depois: criar novo objeto com as novas despesas adicionadas e depois lanca a action
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      // expense.id o id de cada despesa que selecione
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.id,
    };

  case EDITANDO_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => {
          console.log('expense', expense);
          if (state.idToEdit === expense.id) {
            return { ...expense, ...action.payload, id: state.idToEdit };
          }
          return { ...expense };
        }),
      editor: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
