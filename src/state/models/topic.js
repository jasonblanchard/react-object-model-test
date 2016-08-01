import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import merge from 'lodash.merge';

import { receiveModels } from 'app/state/models/actions';

const Topic = {
  modelName: 'Topic',

  reducer() {
    return combineReducers({
      entities: this.entitiesReducer(),
      loading: this.loadingReducer(),
    });
  },

  entitiesReducer() {
    return handleActions({
      [receiveModels]: (state, action) => merge({}, action.payload.entities[this.modelName], state),
    }, {});
  },

  loadingReducer() {
    return false;
  },
};

export default Topic;
