import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import merge from 'lodash.merge';

import { receiveEntities } from 'app/state/models/actions';

const modelName = 'Lesson';

const reducers = {
  entities: handleActions({
    [receiveEntities]: (state, action) => merge({}, state, action.payload.entities[modelName]),
  }, {}),

  loading: () => false,
};

const Lesson = {
  modelName,
  reducer: combineReducers(reducers),

};

export default Lesson;
