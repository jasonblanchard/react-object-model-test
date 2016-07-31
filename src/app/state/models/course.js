import { combineReducers } from 'redux';
import { denormalize } from 'denormalizr';
import { normalize, arrayOf } from 'normalizr';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { loadModels } from 'app/state/actions';
import api from 'app/api';
import schema from 'app/state/models/schema';

// TODO: Does this need to be a class at all? Plain object? Individual exports?
class Course {
  static reducer() {
    return combineReducers({
      entities: Course.entityReducer,
      loading: Course.loadingReducer,
    });
  }

  static entityReducer(state = {}, action) {
    switch (action.type) {
      case 'LOAD_MODELS':
        return merge({}, action.payload.entities.Course, state);
      default:
        return state;
    }
  }

  static loadingReducer(state = false, action) {
    switch (action) {
      default:
        return state;
    }
  }

  static fetch(id = null) {
    return function (dispatch) {
      api.get('Course', id).then(response => {
        let normedResponse = null;
        if (Array.isArray(response)) {
          normedResponse = normalize(response, arrayOf(schema.Course));
        } else {
          normedResponse = normalize(response, schema.Course);
        }
        dispatch(loadModels(normedResponse));
      });
    };
  }

  static get(state = {}, id) {
    const modelSelector = state.models.Course.entities; // TODO: Centralize this somehow.
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

}

Course.modelName = 'Course';
Course.schema = {};

export default Course;
