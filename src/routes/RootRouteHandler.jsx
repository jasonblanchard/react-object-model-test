import React, { PropTypes } from 'react';

const RootPageHandler = (props) => (
  <div>
    <h1>React Object Model Test</h1>
    {props.children}
  </div>
);

RootPageHandler.propTypes = {
  children: PropTypes.node,
};

export default RootPageHandler;
