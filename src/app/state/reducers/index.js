import { combineReducers } from 'redux';
import { modelReducer } from 'app/state/models';

const app = combineReducers({
  models: modelReducer,
});

export default app;
