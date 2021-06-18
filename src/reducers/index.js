import { combineReducers } from 'redux';
import user from './user';
import controls from './controls';

const rootReducer = combineReducers({
  controls,
  user,
});

export default rootReducer;
