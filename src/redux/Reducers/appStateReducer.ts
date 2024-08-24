import {
  SET_APP_STATE,
  STEP_BACKWARD,
  STEP_FORWARD,
  STEP_RESET,
  AppStateActionTypes,
} from '../ActionTypes';

interface AppState {
  loading: boolean;
  appState: string;
  step: number;
  themeMode: 'light' | 'dark';
  dataCollectionModalView: boolean;
}

const initialState: AppState = {
  loading: false,
  appState: '',
  step: 1,
  themeMode: 'light',
  dataCollectionModalView: false,
};

export default function appStateReducer(
  state = initialState,
  action: AppStateActionTypes
): AppState {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        ...state,
        loading: true,
        appState: action.payload,
      };
    case STEP_FORWARD:
      return {
        ...state,
        step: state.step + 1,
      };
    case STEP_BACKWARD:
      return {
        ...state,
        step: state.step === 1 ? 1 : state.step - 1,
      };
    case STEP_RESET:
      return {
        ...state,
        step: 1,
      };
    default:
      return state;
  }
}
