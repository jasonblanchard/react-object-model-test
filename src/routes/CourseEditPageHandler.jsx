import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import CourseEditPage from 'app/pages/CourseEditPage';
import { models } from 'app/state/models';
import { forms } from 'app/state/forms';

class CourseEditPageHandler extends Component {
  render() {
    if (this.props.course) {
      return <CourseEditPage formFields={this.props.editCourseFormFields} course={this.props.course} onChange={this.props.updateEditCourseForm} onSubmit={this.props.updateCourse} isUpdating={this.props.isUpdating} />;
    }
    return <div>loading...</div>;
  }

  componentDidMount() {
    this.props.fetchCourse(this.props.params.courseId);
  }
}

CourseEditPageHandler.propTypes = {
  course: PropTypes.object,
  fetchCourse: PropTypes.func,
  isUpdating: PropTypes.bool,
  params: PropTypes.shape({
    courseId: PropTypes.string,
  }),
  editCourseFormFields: PropTypes.object,
  topics: PropTypes.array,
  updateCourse: PropTypes.func,
  updateEditCourseForm: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  course: models.Course.selectors.get(state, ownProps.params.courseId),
  editCourseFormFields: forms.editCourse.selectors.fields(state),
  isUpdating: models.Course.selectors.isUpdating(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCourse: models.Course.actions.fetch,
    updateCourse: models.Course.actions.update,
    updateEditCourseForm: forms.editCourse.actions.update,
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  // const updateEditCourseForm = forms.editCourse.createUpdateWithDefaults(dispatchProps.dispatch, stateProps.course);
  return Object.assign({}, stateProps, dispatchProps, ownProps);
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditPageHandler);
