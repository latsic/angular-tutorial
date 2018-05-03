
import * as AuthActions from "./auth.actions";


export interface State {
  email: string
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  email: "",
  authenticated: false
};

export function authReducer(

  state = initialState,
  action: AuthActions.AuthActions) {

    switch(action.type) {
      case AuthActions.SIGNUP:
      case AuthActions.SIGNIN:
        return {
          ...state,
          authenticated: true
        }
      case AuthActions.LOGOUT:
        return {
          ...state,
          authenticated: false,
          token: null
        }
      case AuthActions.SET_TOKEN:
        return {
          ...state
        }
      case AuthActions.AUTO_SIGNIN:
        return {
          ...state
        }
      
      

      default: return state;
  }
}


