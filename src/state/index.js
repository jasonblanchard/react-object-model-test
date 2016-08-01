import { combineReducers } from 'redux';
import modelReducer from 'app/state/models';
import formsReducer from 'app/state/forms';

const app = combineReducers({
  models: modelReducer,
  forms: formsReducer,
});

export default app;
