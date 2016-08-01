import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

class CourseEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = { // TODO: Replace this internal state with global state.
      name: props.course.name,
    };

    this.renderTopic = this.renderTopic.bind(this);
    this.renderLessonPreview = this.renderLessonPreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <div>
        <h2>Edit Course: {this.props.course.name}</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.name} id="name" onChange={this.handleChange} />
          </label>
          <input type="submit" value="save" />
        </form>
        <div>
          {this.props.isUpdating ? 'Updaing...' : ''}
        </div>
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

  handleChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.course.id, { name: this.state.name });
  }
}

CourseEditPage.propTypes = {
  course: PropTypes.object,
  isUpdating: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default CourseEditPage;
