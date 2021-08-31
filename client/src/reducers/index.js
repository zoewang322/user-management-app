import { combineReducers } from 'redux';

import users from './users';
import pageStatus from './pageStatus';

export const reducers = combineReducers({ users, pageStatus });
