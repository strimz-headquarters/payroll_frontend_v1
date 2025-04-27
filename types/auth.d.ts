/* eslint-disable @typescript-eslint/no-explicit-any */
export type ErrorDisplayProps = {
  message?: string;
};

export interface EmailInputValues {
  email: string;
}

export interface PasswordInputValues {
  password: string;
}

export type LoginFormInputValues = EmailInputValues & PasswordInputValues;

export interface SignupFormInputValues extends LoginFormInputValues {
  username: string;
}

export interface StrimzUD {
  expiration: number;
  [key: string]: any;
}
