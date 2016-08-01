import { combineReducers } from 'redux';
import Course from './Course';
import Topic from './Topic';
import Lesson from './Lesson';

export const models = {
  [Course.modelName]: Course,
  [Topic.modelName]: Topic,
  [Lesson.modelName]: Lesson,
};

const reducers = Object.keys(models).reduce((memo, modelKey) => (
  Object.assign({}, { [modelKey]: models[modelKey].reducer() }, memo)
), {});

export default combineReducers(reducers);
