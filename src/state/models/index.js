import { combineReducers } from 'redux';
import Course from './Course';
import Topic from './Topic';
import Lesson from './Lesson';

const models = {
  [Course.modelName]: Course,
  [Topic.modelName]: Topic,
  [Lesson.modelName]: Lesson,
};

export const modelReducer = combineReducers({
  [Course.modelName]: Course.reducer(),
  [Topic.modelName]: Topic.reducer(),
  [Lesson.modelName]: Lesson.reducer(),
});

export const modelNames = {
  [Course.modelName]: Course.modelName,
  [Topic.modelName]: Topic.modelName,
  [Lesson.modelName]: Lesson.modelName,
};

export default models;
