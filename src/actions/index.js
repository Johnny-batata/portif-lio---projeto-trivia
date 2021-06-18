export const ENABLE_CONTROL = 'ENABLE_CONTROL';
export const UPDATE_TIMER = 'UPDATE_TIMER';
export const RESTART_TIMER = 'RESTART_TIMER';

export const enableDisable = (disable) => ({
  type: ENABLE_CONTROL,
  payload: disable,
});

export const updateTimer = (value) => ({
  type: UPDATE_TIMER,
  payload: value,
});

export const timerRestart = () => ({
  type: RESTART_TIMER,
});
