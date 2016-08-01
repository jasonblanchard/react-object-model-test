import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import merge from 'lodash.merge';

import { receiveModels } from 'app/state/models/actions';

const Lesson = {
  modelName: 'Lesson',

  reducer() {
    return combineReducers({
      entities: Lesson.entitiesReducer(),
      loading: Lesson.loadingReducer(),
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

export default Lesson;
