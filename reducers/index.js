import { combineReducers } from 'redux';

import AuthReducer from './auth_reducer';
import JobsReducer from './jobs_reducer';
import LikesReducer from './likes_reducer';

export default combineReducers({
  auth: AuthReducer,
  jobs: JobsReducer,
  likedJobs: LikesReducer
});
