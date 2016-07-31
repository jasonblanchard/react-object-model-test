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
        <h2>Course</h2>
        {this.props.course.name}
        <h3>Topics</h3>
        <ul>
          {this.props.course.topics.map(this.renderTopic)}
        </ul>
      </div>
    );
  }

  renderTopic(topic) {
    return (
      <li key={topic.id}>
        {topic.name}
        <ul>
          {topic.lessons.map(this.renderLessonPreview)}
        </ul>
      </li>
    );
  }

  renderLessonPreview(lesson) {
    return (
      <li key={lesson.id}>{lesson.name}</li>
    );
  }
}

CoursePage.propTypes = {
  course: PropTypes.object,
};

export default CoursePage;
