import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import CoursesPage from 'app/pages/CoursesPage';
import { models } from 'app/state/models';

class CoursesPageHandler extends Component {
  render() {
    return this.props.isLoading ? <div>Loading...</div> : <CoursesPage courses={this.props.courses} />;
  }

  componentDidMount() {
    this.props.fetchCourse();
  }
}

CoursesPageHandler.propTypes = {
  courses: PropTypes.object,
  fetchCourse: PropTypes.func,
  isLoading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    courses: models.Course.get(state),
    isLoading: models.Course.isLoading(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCourse: models.Course.fetch,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPageHandler);
