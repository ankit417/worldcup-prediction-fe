import {
  LOGIN,
  PASSWORD,
  LOGOUT,
  CHANGE_PASSWORD,
  FORGET_PASSWORD,
  RESET_PASSWORD,
} from "../actions";

const initalState = {
  loading: false,
  error: false,

  logoutLoading: false,

  passwordLoader: false,

  forgetPasswordLoader: false,
  changePasswordLoader: false,

  resetLoader: false,
};

export function loginReducer(state = initalState, action: any) {
  const { type } = action;

  switch (type) {
    case LOGIN.LOADING:
      return { ...state, loading: true, error: false };
    case LOGIN.SUCCESS:
      return { ...state, loading: false, error: false };
    case LOGIN.ERROR:
      return { ...state, loading: false, error: true };

    case LOGOUT.LOADING:
      return { ...state, logoutLoading: true };
    case LOGOUT.SUCCESS:
      return { ...state, logoutLoading: false };
    case LOGOUT.ERROR:
      return { ...state, logoutLoading: false };

    // PASSWORD
    case PASSWORD.LOADING:
      return {
        ...state,
        passwordLoader: true,
      };
    case PASSWORD.SUCCESS:
      return {
        ...state,
        passwordLoader: false,
      };
    case PASSWORD.ERROR:
      return {
        ...state,
        passwordLoader: false,
      };

    case FORGET_PASSWORD.LOADING:
      return {
        ...state,
        forgetPasswordLoader: true,
      };
    case FORGET_PASSWORD.SUCCESS:
      return {
        ...state,
        forgetPasswordLoader: false,
      };
    case FORGET_PASSWORD.ERROR:
      return {
        ...state,
        forgetPasswordLoader: false,
      };

    case CHANGE_PASSWORD.LOADING:
      return {
        ...state,
        changePasswordLoader: true,
      };
    case CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        changePasswordLoader: false,
      };
    case CHANGE_PASSWORD.ERROR:
      return {
        ...state,
        changePasswordLoader: false,
      };

    case RESET_PASSWORD.LOADING:
      return { ...state, resetLoader: true };
    case RESET_PASSWORD.SUCCESS:
      return { ...state, resetLoader: false };
    case RESET_PASSWORD.ERROR:
      return { ...state, resetLoader: false };

    default:
      return state;
  }
}
