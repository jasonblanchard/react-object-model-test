import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

class CoursePage extends Component {
  constructor(props) {
    super(props);

    this.renderTopic = this.renderTopic.bind(this);
    this.renderLessonPreview = this.renderLessonPreview.bind(this);
  }
  render() {
    return (
      <div>
        <h2>Course: {this.props.course.name}</h2>
        <Link to={`/courses/${this.props.course.id}/edit`}>Edit</Link>
        {this.props.course.topics.map(this.renderTopic)}
        <div>
          <Link to="/courses">&lt;&lt; back to courses</Link>
        </div>
      </div>
    );
  }

  renderTopic(topic) {
    return (
      <div key={topic.id}>
        <h3>Topic: {topic.name}</h3>
        <ul>
          {topic.lessons.map(this.renderLessonPreview)}
        </ul>
      </div>
    );
  }

  renderLessonPreview(lesson) {
    return (
      <li key={lesson.id}>Lesson: {lesson.name}</li>
    );
  }
}

CoursePage.propTypes = {
  course: PropTypes.object,
};

export default CoursePage;
