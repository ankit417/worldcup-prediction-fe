import { USER, GET_USER_LIST, GET_USER_INFO } from '../actions'

const initalState: any = {
  loading: false,
  user: null,
  verificationSuccess: false,
  userListLoading: false,
  userlist: [],
  userInfo: null,
  userInfoLoading: false,
}

export function userReducer(state = initalState, action: any) {
  const { type, payload } = action

  switch (type) {
    case USER.LOADING:
      return { ...state, loading: true, user: null }
    case USER.SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        verificationSuccess: true,
      }
    case USER.ERROR:
      return { ...state, loading: false, user: null }

    case GET_USER_LIST.LOADING:
      return { ...state, userListLoading: true }
    case GET_USER_LIST.SUCCESS:
      return { ...state, userListLoading: false, userlist: payload.data }
    case GET_USER_LIST.ERROR:
      return { ...state, userListLoading: false }
    case GET_USER_INFO.LOADING:
      return { ...state, userInfoLoading: true }
    case GET_USER_INFO.SUCCESS:
      return { ...state, userInfoLoading: false, userInfo: payload.data }
    case GET_USER_INFO.ERROR:
      return { ...state, userInfoLoading: false }
    default:
      return state
  }
}
