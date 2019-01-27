import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './give-consent.less';

class GiveConsent extends React.Component {
  state = {
    name: '',
    email: '',
    newletter: false,
    ads: false,
    statistics: false,
  }

  handleCheckboxChange = (e) => {
    const { checked, value } = e.target;

    this.setState({
      [value]: checked,
    });
  }


  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const {
      name, email, newletter, ads, statistics,
    } = this.state;
    const { dispatch } = this.props;

    dispatch({
      type: 'consent/giveConsent',
      payload: {
        name, email, newletter, ads, statistics,
      },
    });
  }

  render() {
    const {
      name, email, newletter, ads, statistics,
    } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleFormSubmit}>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <FormControl className={styles.input} variant="filled">
              <InputLabel htmlFor="name">Name</InputLabel>
              <FilledInput name="name" value={name} onChange={this.handleInputChange} required />
            </FormControl>
            <FormControl className={styles.input} variant="filled">
              <InputLabel htmlFor="email">Email address</InputLabel>
              <FilledInput name="email" value={email} onChange={this.handleInputChange} required />
            </FormControl>
          </Grid>
          <Grid>
            <Typography component="p" className={styles.agreeText}>I agree to:</Typography>
            <Card>
              <CardContent>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox checked={newletter} value="newletter" onChange={this.handleCheckboxChange} />
                    }
                      label="Receive newletter"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={ads} value="ads" onChange={this.handleCheckboxChange} />
                    }
                      label="Be shown targeted ads"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={statistics} value="statistics" onChange={this.handleCheckboxChange} />
                    }
                      label="Contribute to anonymous visit statistics"
                    />
                  </FormGroup>
                </FormControl>

              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Button className={styles.giveConsent} variant="contained" color="primary" type="submit">
            Give consent
            </Button>
          </Grid>
        </Grid>

      </form>
    );
  }
}

GiveConsent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  consent: PropTypes.shape({
    consents: PropTypes.array,
    meta: PropTypes.object,
  }).isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(GiveConsent);
