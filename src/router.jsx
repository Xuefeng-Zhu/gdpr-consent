import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Redirect } from 'dva/router';
import Dynamic from 'dva/dynamic';

import App from './app';

const redirectToHome = () => <Redirect to="/give-consent" />;

function RouterConfig({
  history, app,
}) {
  const GiveConsent = Dynamic({
    app,
    component: () => import('./routes/give-consent'),
  });

  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/give-consent" component={GiveConsent} />
          <Route exact path="/consents" component={GiveConsent} />
          <Route exact path="/" render={redirectToHome} />
        </Switch>
      </App>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RouterConfig;
