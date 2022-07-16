import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { projectReducer } from './project.reducer';
export default combineReducers({
  authReducer,
  projectReducer,
});
