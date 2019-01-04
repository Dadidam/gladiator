import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'components/Home';
import NotFound from 'components/NotFound';

export default ({ childProps }) => (
  <Switch>
    {/* home page route */}
    <Route path="/" exact component={Home} props={childProps} />

    {/* 404 page */}
    <Route component={NotFound} />
  </Switch>
);
