import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { denormalize } from 'denormalizr';
import { normalize, arrayOf } from 'normalizr';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { fetchModels, receiveModels } from 'app/state/models/actions';
import api from 'app/api';
import schema from 'app/state/models/schema';

// TODO: Does this need to be a class at all? Plain object? Individual exports?
class Course {
  static reducer() {
    return combineReducers({
      entities: Course.entitiesReducer(),
      loading: Course.loadingReducer(),
    });
  }

  static entitiesReducer() {
    return handleActions({
      [receiveModels]: (state, action) => merge({}, action.payload.entities.Course, state),
    }, {});
  }

  static loadingReducer() {
    return handleActions({
      [receiveModels]: () => false,
      [fetchModels]: () => true,
    }, false);
  }

  static fetch(id = null) {
    return function (dispatch) {
      dispatch(fetchModels());
      api.get('Course', id).then(response => {
        let normedResponse = null;
        if (Array.isArray(response)) {
          normedResponse = normalize(response, arrayOf(schema.Course));
        } else {
          normedResponse = normalize(response, schema.Course);
        }
        dispatch(receiveModels(normedResponse));
      });
    };
  }

  static get(state = {}, id) {
    const modelSelector = state.models.Course.entities; // TODO: Centralize this state moint point somehow.
    const entities = Object.keys(state.models).reduce((memo, modelKey) => {
      const tmp = memo;
      tmp[modelKey] = state.models[modelKey].entities;
      return tmp;
    }, {}); // TODO: YUCK. Denormalize does not like this entity shape.
    if (id) {
      return denormalize(get(modelSelector, id), entities, schema.Course);
    }
    return denormalize(modelSelector, entities, schema.Course);
  }

  static isLoading(state = {}) {
    return state.models.Course.loading; // TODO: Centralize this state moint point somehow.
  }
}

Course.modelName = 'Course';
Course.schema = {};

export default Course;
