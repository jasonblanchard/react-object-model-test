import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import app from 'app/state';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

export default function (initialState) {
  return createStoreWithMiddleware(app, initialState);
}
