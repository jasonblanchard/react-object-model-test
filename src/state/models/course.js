import { combineReducers } from 'redux';
import { denormalize } from 'denormalizr';
import { handleActions } from 'redux-actions';
import { normalize, arrayOf } from 'normalizr';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { fetchEntities, receiveEntities } from 'app/state/models/actions';
import api from 'app/api';
import schema from 'app/state/models/schema';

const Course = {
  modelName: 'Course',

  reducer() {
    return combineReducers({
      entities: this.entitiesReducer(),
      loading: this.loadingReducer(),
    });
  },

  entitiesReducer() {
    return handleActions({
      // TODO: This is identical across model utility classes. Possibly centralize.
      [receiveEntities]: (state, action) => merge({}, action.payload.entities[this.modelName], state),
    }, {});
  },

  loadingReducer() {
    return handleActions({
      [receiveEntities]: () => false,
      [fetchEntities]: (state, action) => action.payload === this.modelName,
    }, false);
  },

  fetchAll() {
    return (dispatch) => {
      dispatch(fetchEntities(this.modelName));
      api.get('Course').then(response => {
        const normedResponse = normalize(response, arrayOf(schema.Course));
        dispatch(receiveEntities(normedResponse));
      });
    };
  },

  fetch(id = null) {
    return (dispatch) => {
      dispatch(fetchEntities(this.modelName));
      api.get('Course', id).then(response => {
        const normedResponse = normalize(response, schema.Course);
        dispatch(receiveEntities(normedResponse));
      });
    };
  },

  get(state = {}, id) {
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
  },

  isLoading(state = {}) {
    return state.models.Course.loading; // TODO: Centralize this state moint point somehow.
  },
};

export default Course;
