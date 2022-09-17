import { USER } from "../actions";

const initalState: any = {
  loading: false,
  user: null,
  verificationSuccess: false,
};

export function userReducer(state = initalState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case USER.LOADING:
      return { ...state, loading: true, user: null };
    case USER.SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        verificationSuccess: true,
      };
    case USER.ERROR:
      return { ...state, loading: false, user: null };

    default:
      return state;
  }
}
