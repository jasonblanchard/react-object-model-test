import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import RootRouteHandler from 'app/routes/RootRouteHandler';
import CoursesPageHandler from 'app/routes/CoursesPageHandler';
import CoursePageHandler from 'app/routes/CoursePageHandler';

export default (
  <Route path="/" component={RootRouteHandler}>
    <IndexRedirect to="/courses" />
    <Route path="courses" component={CoursesPageHandler} />
    <Route path="courses/:courseId" component={CoursePageHandler} />
  </Route>
);
