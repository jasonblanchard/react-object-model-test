import { createAction, handleActions } from 'redux-actions';

const formName = 'editCourse';

const actions = {
  update: createAction('FORMS/EDIT_COURSE/UPDATE'),
};

const reducer = handleActions({
  [actions.update]: (state, action) => Object.assign({}, state, action.payload),
}, { name: '' });

const selectors = {
  fields(state = {}) {
    return state.forms[formName];
  },
};

const editCourse = {
  formName,
  reducer,
  actions,
  selectors,
};

export default editCourse;
