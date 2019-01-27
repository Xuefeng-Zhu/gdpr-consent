import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class Consents extends React.Component {
  handlePageChange = (page) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/consents',
      search: queryString.stringify({
        page,
      }),
    }));
  }

  render() {
    const { consent } = this.props;
    const { consents = [], meta = {} } = consent;
    return (
      <Grid container direction="column" alignItems="center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Consent given for</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consents.map(row => (
              <TableRow key={row.email}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.consent}</TableCell>
              </TableRow>
          ))}
          </TableBody>
        </Table>
        <Pagination pageSize={2} total={meta.total} current={meta.current} onChange={this.handlePageChange} />
      </Grid>
    );
  }
}


Consents.propTypes = {
  dispatch: PropTypes.func.isRequired,
  consent: PropTypes.shape({
    consents: PropTypes.array,
    meta: PropTypes.object,
  }).isRequired,
};

function mapStateToProps({ consent }) {
  return {
    consent,
  };
}

export default connect(mapStateToProps)(Consents);
