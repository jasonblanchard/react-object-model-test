import { combineReducers } from 'redux';
import merge from 'lodash.merge';

class Topic {
  static reducer() {
    return combineReducers({
      entities: Topic.entityReducer,
      loading: Topic.loadingReducer,
    });
  }

  static entityReducer(state = {}, action) {
    switch (action.type) {
      case 'LOAD_MODELS':
        return merge({}, action.payload.entities.Topic, state);
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

}

Topic.modelName = 'Topic';
Topic.schema = {};

export default Topic;
