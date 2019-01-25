import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Button from '@material-ui/core/Button';

import styles from './index.less';

function Index({
  location,
}) {
  return (
    <Button variant="contained" color="primary">
    Hello World
    </Button>
  );
}

Index.propTypes = {
  location: PropTypes.object.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Index);
