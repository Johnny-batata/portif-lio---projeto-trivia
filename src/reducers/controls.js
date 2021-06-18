import { ENABLE_CONTROL, RESTART_TIMER, UPDATE_TIMER } from '../actions';

const TIME_TO_ANSWER = 8;

const INITIAL_STATE = {
  disable: false,
  timer: TIME_TO_ANSWER,
};

export default function controls(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ENABLE_CONTROL:
    return {
      ...state,
      disable: action.payload,
    };
  case UPDATE_TIMER:
    return {
      ...state,
      timer: action.payload,
    };
  case RESTART_TIMER:
    return {
      ...state,
      timer: TIME_TO_ANSWER,
    };
  default:
    return state;
  }
}
