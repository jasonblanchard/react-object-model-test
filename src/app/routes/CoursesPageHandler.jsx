import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import CoursesPage from 'app/pages/CoursesPage';
import models from 'app/state/models';

class CoursesPageHandler extends Component {
  render() {
    return <CoursesPage courses={this.props.courses} />;
  }

  componentDidMount() {
    this.props.fetchCourse();
  }
}

CoursesPageHandler.propTypes = {
  courses: PropTypes.object,
  fetchCourse: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    courses: models.Course.get(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCourse: models.Course.fetch,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPageHandler);
