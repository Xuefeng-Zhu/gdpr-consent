import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './index.less';

function App({
  children, loading, location,
}) {
  const { pathname } = location;
  return (
    <Grid container>
      <Grid item xs={2}>
        <MenuList>
          <MenuItem selected={pathname === '/give-consent'}>
            Give consent
          </MenuItem>
        </MenuList>
        <MenuList>
          <MenuItem selected={pathname === '/consents'}>
            Collected consents
          </MenuItem>
        </MenuList>
      </Grid>
      <Grid item xs={10}>
        <Paper className={styles.content}>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state;

  return {
    loading,
  };
}

export default withRouter(connect(mapStateToProps)(App));
