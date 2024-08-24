import { combineReducers } from 'redux';
import appStateReducer from './appStateReducer';

export interface RootState {
  appState: ReturnType<typeof appStateReducer>;
}

const rootReducer = combineReducers({
  appState: appStateReducer,
});

export default rootReducer;
