import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enableDisable, updateTimer } from '../actions';

const ONE_SECOND = 1000;
let theEnd;

class Timer extends Component {
  componentDidMount() {
    theEnd = setInterval(() => { this.regress(); }, ONE_SECOND);
  }

  regress() {
    const { timer, toggleEnable, updateTimerValue } = this.props;
    if (timer > 0) {
      updateTimerValue(timer - 1);
    } else {
      clearInterval(theEnd);
      toggleEnable(true);
    }
  }

  render() {
    const { timer } = this.props;
    return (
      <div>{ timer }</div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  toggleEnable: PropTypes.func.isRequired,
  updateTimerValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.controls.timer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEnable: (value) => dispatch(enableDisable(value)),
  updateTimerValue: (time) => dispatch(updateTimer(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
