import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'dva/router';
import Dynamic from 'dva/dynamic';

import App from './App';

function RouterConfig({
  history, app,
}) {
  const Index = Dynamic({
    app,
    // models: () => [
    //   import('./models/index')
    // ],
    component: () => import('./routes/index'),
  });

  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Index} />
        </Switch>
      </App>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RouterConfig;
