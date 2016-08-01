import { combineReducers } from 'redux';
import { denormalize } from 'denormalizr';
import { handleActions, createAction } from 'redux-actions';
import { normalize, arrayOf } from 'normalizr';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { fetchEntities, receiveEntities } from 'app/state/models/actions';
import api from 'app/api';
import schema from 'app/state/models/schema';

const modelName = 'Course';

const reducers = {
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
      [this.actions.updateCourse]: () => true,
      [receiveEntities]: () => false,
    }, false);
  },
};

const actions = {
  fetchAll() {
    return (dispatch) => {
      dispatch(fetchEntities(modelName));
      api.get(modelName).then(response => {
        const normedResponse = normalize(response, arrayOf(schema[modelName]));
        dispatch(receiveEntities(normedResponse));
      });
    };
  },

  fetch(id = null) {
    return (dispatch) => {
      dispatch(fetchEntities(modelName));
      api.get(modelName, id).then(response => {
        const normedResponse = normalize(response, schema[modelName]);
        dispatch(receiveEntities(normedResponse));
      });
    };
  },

  requestUpdate: createAction('REQUEST_UPDATE_COURSE'),

  update(id, params) {
    return dispatch => {
      dispatch(actions.requestUpdate());
      api.update('Course', id, params).then(response => {
        const normedResponse = normalize(response, schema[modelName]);
        dispatch(receiveEntities(normedResponse));
      });
    };
  },
};

const selectors = {
  entities(state = {}) {
    return Object.keys(state.models).reduce((memo, modelKey) => {
      const tmp = memo;
      tmp[modelKey] = state.models[modelKey].entities;
      return tmp;
    }, {}); // TODO: YUCK. Denormalize does not like this entity shape.
  },

  getAll(state = {}) {
    const modelSelector = state.models.Course.entities; // TODO: Centralize this state moint point somehow.
    const entities = this.entities(state);
    return denormalize(modelSelector, entities, schema.Course);
  },

  get(state = {}, id) {
    const modelSelector = state.models.Course.entities; // TODO: Centralize this state moint point somehow.
    const entities = this.entities(state);
    return denormalize(get(modelSelector, id), entities, schema.Course);
  },

  isLoading(state = {}) {
    return state.models.Course.isLoading; // TODO: Centralize this state moint point somehow.
  },

  isUpdating(state = {}) {
    return state.models.Course.isUpdating; // TODO: Centralize this state moint point somehow.
  },
};

const Course = {
  modelName,
  reducer() {
    return combineReducers({
      entities: reducers.entitiesReducer.bind(this)(),
      isLoading: reducers.isLoadingReducer.bind(this)(),
      isUpdating: reducers.isUpdatingReducer.bind(this)(),
    });
  },
  actions,
  selectors,
};

export default Course;
