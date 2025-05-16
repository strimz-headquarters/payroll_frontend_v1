/* eslint-disable @typescript-eslint/no-explicit-any */

// This type is for the error display component
export type ErrorDisplayProps = {
  message?: string;
};

// This type is for the email input
export interface EmailInputValues {
  email: string;
}

// This type is for the password input
export interface PasswordInputValues {
  password: string;
}

// This type is for the login input values
export type LoginFormInputValues = EmailInputValues & PasswordInputValues;

// This type is for the signup input values
export interface SignupFormInputValues extends LoginFormInputValues {
  username: string;
}

// This type is for the auth payload
export interface StrimzUD {
  expiration: number;
  [key: string]: any;
}
