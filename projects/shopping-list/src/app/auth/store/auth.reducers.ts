
import * as AuthActions from "./auth.actions";


export interface State {
  email: string;
  token: string;
  authenticated: boolean;
  errorMsg: string;
}

const initialState: State = {
  email: null,
  token: null,
  authenticated: false,
  errorMsg: null
};

export function authReducer(

  state = initialState,
  action: AuthActions.AuthActions) {

    switch(action.type) {
      case AuthActions.SIGNUP:
      case AuthActions.SIGNIN:
        console.log("auth reducer", "SIGNIN");
        return {
          ...state,
          authenticated: true,
          email: action.email,
          errorMsg: null
        }
      case AuthActions.LOGOUT:
        console.log("auth reducer", "LOGOUT");
        return {
          ...state,
          authenticated: false,
          token: null,
          email: "",
          errorMsg: null
        }
      case AuthActions.SET_TOKEN:
        console.log("auth reducer", "SET_TOKEN");
        return {
          ...state,
          token: action.token,
          errorMsg: null
        }
      case AuthActions.AUTO_SIGNIN:
      console.log("auth reducer", "AUTO_SIGNIN");
        return {
          ...state,
          authenticated: true,
          email: action.email,
          errorMsg: null
        }
      case AuthActions.AUTH_ERROR:

        console.log("reducer, auth error", action.error.message);
        
        return {
          ...state,
          errorMsg: action.error.message
        }
      
      default: return state;
  }
}


