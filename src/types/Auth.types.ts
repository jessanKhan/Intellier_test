import { type SIGN_IN_REQUEST, type TEST_CHECK } from '@/constants/Auth.constants';

export interface AuthState {
  pending: boolean;
  token: string | null;
  error: string | null;
}

export interface SignupPayload {
  values: { email: string; password: string };
}

export interface SagaSignInFetchType {
  email: string;
  password: string;
}

export interface SignInPayload {
  type: typeof SIGN_IN_REQUEST;
  values: { email: string; password: string };
}

export interface SignInRequest {
  type: typeof SIGN_IN_REQUEST;
  payload: SignInPayload;
}

export interface MyTokenPayload {
  token: string;
}

export interface TestCase {
  type: typeof TEST_CHECK;
  payload: MyTokenPayload;
}

export type AuthAction = SignInPayload | TestCase; // | LoginSuccess;
