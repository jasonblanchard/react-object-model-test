import { createAction, handleActions } from 'redux-actions';

const formName = 'editCourse';

const fields = { name: '' };

const actions = {
  update: createAction('FORMS/EDIT_COURSE/UPDATE'),
};

const reducer = handleActions({
  '@@router/LOCATION_CHANGE': () => fields,
  [actions.update]: (state, action) => Object.assign({}, state, action.payload),
}, fields);

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
