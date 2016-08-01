import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import CourseEditPage from 'app/pages/CourseEditPage';
import { models } from 'app/state/models';

class CourseEditPageHandler extends Component {
  render() {
    if (this.props.course) {
      return <CourseEditPage course={this.props.course} onSubmit={this.props.updateCourse} isUpdating={this.props.isUpdating} />;
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
  topics: PropTypes.array,
  updateCourse: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  course: models.Course.get(state, ownProps.params.courseId),
  isUpdating: models.Course.isUpdating(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCourse: models.Course.fetch.bind(models.Course),
    updateCourse: models.Course.update,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditPageHandler);
