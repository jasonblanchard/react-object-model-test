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
    this.props.fetchCourses();
  }
}

CoursesPageHandler.propTypes = {
  courses: PropTypes.object,
  fetchCourses: PropTypes.func,
  isLoading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    courses: models.Course.selectors.getAll(state),
    isLoading: models.Course.selectors.isLoading(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCourses: models.Course.actions.fetchAll,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPageHandler);
