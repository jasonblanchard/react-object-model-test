import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import CourseEditPage from 'app/pages/CourseEditPage';
import { models } from 'app/state/models';

class CourseEditPageHandler extends Component {
  render() {
    if (this.props.course) {
      return <CourseEditPage course={this.props.course} />;
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
    fetchCourse: models.Course.fetch.bind(models.Course),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditPageHandler);
