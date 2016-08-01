import { combineReducers } from 'redux';

import editCourse from 'app/state/forms/editCourse';

export const forms = {
  [editCourse.formName]: editCourse,
};

const reducers = Object.keys(forms).reduce((memo, formKey) => (
  Object.assign({}, { [formKey]: forms[formKey].reducer }, memo)
), {});

export default combineReducers(reducers);
