import { Action } from "@ngrx/store";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";
export const AUTO_SIGNIN = "AUTO_SIGNIN";
export const SET_TOKEN = "SET_TOKEN";

export class Signup implements Action {
  readonly type = SIGNUP;

  constructor() {

  }
}

export class Signin implements Action {
  readonly type = SIGNIN;

  constructor() {

  }
}
export class Logout implements Action {
  readonly type = LOGOUT;

  constructor() {

  }
}
export class AutoSignin implements Action {
  readonly type = AUTO_SIGNIN;

  constructor() {

  }
}
export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {

  }
}




export type AuthActions =
  Signup | Signin | Logout | AutoSignin | SetToken;