// src/ActionTypes.ts
export const SET_APP_STATE = 'SET_APP_STATE';
export const STEP_FORWARD = 'STEP_FORWARD';
export const STEP_BACKWARD = 'STEP_BACKWARD';
export const STEP_RESET = 'STEP_RESET';
export const SET_THEME = 'SET_THEME';
export const SET_DATA_CONNECTION_MODAL_VIEW = 'SET_DATA_CONNECTION_MODAL_VIEW';

export interface SetAppStateAction {
  type: typeof SET_APP_STATE;
  payload: string;
}

export interface StepForwardAction {
  type: typeof STEP_FORWARD;
}

export interface StepBackwardAction {
  type: typeof STEP_BACKWARD;
}

export interface StepResetAction {
  type: typeof STEP_RESET;
}

export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: 'light' | 'dark';
}

export interface SetDataConnectionModalViewAction {
  type: typeof SET_DATA_CONNECTION_MODAL_VIEW;
  payload: boolean;
}

export type AppStateActionTypes =
  | SetAppStateAction
  | StepForwardAction
  | StepBackwardAction
  | StepResetAction
  | SetThemeAction
  | SetDataConnectionModalViewAction;
