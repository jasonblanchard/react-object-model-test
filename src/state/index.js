import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import modelReducer from 'app/state/models';
import formsReducer from 'app/state/forms';

const app = combineReducers({
  models: modelReducer,
  forms: formsReducer,
  routing: routerReducer,
});

export default app;
