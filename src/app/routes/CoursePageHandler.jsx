import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import CoursePage from 'app/pages/CoursePage';
import models from 'app/state/models';

class CoursePageHandler extends Component {
  render() {
    if (this.props.course) {
      return <CoursePage course={this.props.course} />;
    }
    return <div>loading...</div>;
  }

  componentDidMount() {
    this.props.fetchCourse(this.props.params.courseId);
  }
}

CoursePageHandler.propTypes = {
  course: PropTypes.object,
  fetchCourse: PropTypes.func,
  params: PropTypes.shape({
    courseId: PropTypes.string,
  }),
  topics: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => ({
  course: models.Course.get(state, ownProps.params.courseId),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCourse: models.Course.fetch,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePageHandler);
