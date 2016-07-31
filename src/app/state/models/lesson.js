import { combineReducers } from 'redux';
import merge from 'lodash.merge';

class Lesson {
  static reducer() {
    return combineReducers({
      entities: Lesson.entityReducer,
      loading: Lesson.loadingReducer,
    });
  }

  static entityReducer(state = {}, action) {
    switch (action.type) {
      case 'LOAD_MODELS':
        return merge({}, action.payload.entities.Lesson, state);
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

Lesson.modelName = 'Lesson';
Lesson.schema = {};

export default Lesson;
