import { SignInMethod } from "./constant";

export interface AuthUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  authenticationMethod: string;
  avatarUrl: string | null;
  verified: boolean;
  status: string;
}

export interface IAuth {
  user: AuthUser | null;
}

export interface IGoogleAccounts {
  accounts: {
    id: {
      initialize: (options: IInitializeOptions) => void;
      renderButton: (element: HTMLElement | null, options: IRenderButtonOptions) => void;
      prompt: () => void;
      revoke: (id: string, callback: () => void) => void;
    };
  };
}

interface IRenderButtonOptions {
  theme: "outline" | "filled" | "filled_black" | "filled_blue"; // You can extend this
  size: "small" | "medium" | "large"; // You can extend this
  text: IGoogleText;
  width?: number;
  logo_alignment: string;
}

export type IGoogleText = "signin_with" | "signup_with";

export interface IInitializeOptions {
  client_id: string;
  callback: (response: IGoogleOAuthResponse) => void;
}

export interface IGoogleOAuthResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

export interface IGoogleOAuthProps {
  callback: (response: IGoogleOAuthResponse) => void;
  text: IGoogleText;
}

export interface IGoogleOAuthPayload {
  idToken: string;
  signInWith: SignInMethod;
}

export interface IServerError {
  message: string;
  path: string;
  method: string;
  statusCode: number;
  timeStamp: number;
}

declare global {
  interface Window {
    google: IGoogleAccounts;
  }
}
