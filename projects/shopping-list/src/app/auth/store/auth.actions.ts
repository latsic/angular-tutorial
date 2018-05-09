import { Action } from "@ngrx/store";

export const AUTH_ERROR = "AUTH_ERROR";
export const TRY_SIGNUP = "TRY_SIGNUP";
export const TRY_SIGNIN = "TRY_SIGNIN";
export const TRY_LOGOUT = "TRY_LOGOUT";
export const TRY_AUTOSIGNIN = "TRY_AUTOSIGNIN";
export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";
export const AUTO_SIGNIN = "AUTO_SIGNIN";
export const SET_TOKEN = "SET_TOKEN";

export class AuthError implements Action {
  readonly type = AUTH_ERROR;

  constructor(public error: Error) {
  
  }
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {email: string, password: string}) {
  }
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: {email: string, password: string}) {

  }
}

export class TryLogout implements Action {
  readonly type = TRY_LOGOUT;

  constructor() {

  }
}

export class TryAutoSignin implements Action {
  readonly type = TRY_AUTOSIGNIN;

  constructor() {

  }
}

export class Signup implements Action {
  readonly type = SIGNUP;

  constructor(public email: string) {

  }
}

export class Signin implements Action {
  readonly type = SIGNIN;

  constructor(public email) {

  }
}
export class Logout implements Action {
  readonly type = LOGOUT;

  constructor() {

  }
}
export class AutoSignin implements Action {
  readonly type = AUTO_SIGNIN;

  constructor(public email: string) {

  }
}
export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public token: string) {

  }
}

export type AuthActions =
  AuthError | Signup | Signin | Logout | AutoSignin | SetToken |
  TrySignup | TrySignin | TryLogout | TryAutoSignin;