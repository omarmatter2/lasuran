export interface AuthState {
  loading: boolean;
  token: string;
  user: {},
  step: string,
  mobile_number: string,
  mobile_code: string;
  otp: string | null
}