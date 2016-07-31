import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

class CoursesPage extends Component {
  constructor(props) {
    super(props);
    this.renderCourse = this.renderCourse.bind(this);
  }

  render() {
    return (
      <div>
        <h2>Courses</h2>
        {Object.keys(this.props.courses).sort().map(this.renderCourse)}
      </div>
    );
  }

  renderCourse(courseId) {
    return (
      <div key={courseId}>
        <Link to={`courses/${courseId}`}>{this.props.courses[courseId].name}</Link>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.object,
};

CoursesPage.defaultProps = {
  courses: {},
};

export default CoursesPage;
