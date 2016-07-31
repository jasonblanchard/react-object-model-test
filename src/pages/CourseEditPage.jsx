import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

class CourseEditPage extends Component {
  constructor(props) {
    super(props);

    this.renderTopic = this.renderTopic.bind(this);
    this.renderLessonPreview = this.renderLessonPreview.bind(this);
  }
  render() {
    return (
      <div>
        <h2>Edit Course: {this.props.course.name}</h2>
        <form>
          <label>
            Name:
            <input type="text" />
          </label>
          <input type="submit" value="save" />
        </form>
        <Link to={`/courses/${this.props.course.id}`}>&lt;&lt; back to {this.props.course.name}</Link>
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

CourseEditPage.propTypes = {
  course: PropTypes.object,
};

export default CourseEditPage;
