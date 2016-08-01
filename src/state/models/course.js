import { combineReducers } from 'redux';
import { denormalize } from 'denormalizr';
import { handleActions, createAction } from 'redux-actions';
import { normalize, arrayOf } from 'normalizr';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { fetchEntities, receiveEntities } from 'app/state/models/actions';
import api from 'app/api';
import schema from 'app/state/models/schema';

const updateCourse = createAction('UPDATE_COURSE');

const Course = {
  modelName: 'Course',

  reducer() {
    return combineReducers({
      entities: this.entitiesReducer(),
      isLoading: this.isLoadingReducer(),
      isUpdating: this.isUpdatingReducer(),
    });
  },

  entitiesReducer() {
    return handleActions({
      // TODO: This is identical across model utility classes. Possibly centralize.
      [receiveEntities]: (state, action) => merge({}, state, action.payload.entities[this.modelName]),
    }, {});
  },

  isLoadingReducer() {
    return handleActions({
      [receiveEntities]: () => false,
      [fetchEntities]: (state, action) => action.payload === this.modelName,
    }, false);
  },

  isUpdatingReducer() {
    return handleActions({
      [updateCourse]: () => true,
      [receiveEntities]: () => false,
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

  update(id, params) {
    return dispatch => {
      dispatch(updateCourse());
      api.update('Course', id, params).then(response => {
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

  isUpdating(state = {}) {
    return state.models.Course.isUpdating; // TODO: Centralize this state moint point somehow.
  },
};

export default Course;
