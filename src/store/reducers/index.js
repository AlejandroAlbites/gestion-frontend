import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { projectReducer } from './project.reducer';
import { technicianReducer } from './technician.reducer';
import { groupReducer } from './group.reducer';
export default combineReducers({
  authReducer,
  projectReducer,
  technicianReducer,
  groupReducer,
});
