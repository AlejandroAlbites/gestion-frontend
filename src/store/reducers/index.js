import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { projectReducer } from './project.reducer';
import { technicianReducer } from './technician.reducer';
export default combineReducers({
  authReducer,
  projectReducer,
  technicianReducer,
});
