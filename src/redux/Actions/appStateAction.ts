import {


  STEP_FORWARD,
  STEP_BACKWARD,
  STEP_RESET,

} from '../ActionTypes';






export const stepUp = () => ({
  type: STEP_FORWARD,
});

export const stepDown = () => ({
  type: STEP_BACKWARD,
});
export const stepReset = () => ({
  type: STEP_RESET,
});


