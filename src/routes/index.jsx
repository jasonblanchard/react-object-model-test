import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import RootRouteHandler from 'app/routes/RootRouteHandler';
import CourseEditPageHandler from 'app/routes/CourseEditPageHandler';
import CoursesPageHandler from 'app/routes/CoursesPageHandler';
import CoursePageHandler from 'app/routes/CoursePageHandler';

export default (
  <Route path="/" component={RootRouteHandler}>
    <IndexRedirect to="/courses" />
    <Route path="courses">
      <IndexRoute component={CoursesPageHandler} />
      <Route path=":courseId" component={CoursePageHandler} />
      <Route path=":courseId/edit" component={CourseEditPageHandler} />
    </Route>
  </Route>
);
