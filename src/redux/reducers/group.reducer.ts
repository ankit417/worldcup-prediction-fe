import { GROUP, GROUP_INFO } from '../actions'

const initialState: {
  groupLoading: boolean
  groupList: Array<object>
  groupInfoLoading: boolean
  groupInfoList: Array<object>
} = {
  groupLoading: false,
  groupList: [],
  groupInfoLoading: false,
  groupInfoList: [],
}

export function groupReducer(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case GROUP.LOADING:
      return { ...state, groupLoading: true }
    case GROUP.SUCCESS:
      return {
        ...state,
        groupLoading: false,
        groupList: payload.data,
      }
    case GROUP.ERROR:
      return { ...state, groupLoading: false }
    case GROUP_INFO.LOADING:
      return { ...state, groupInfoLoading: true }
    case GROUP_INFO.SUCCESS:
      return { ...state, groupInfoLoading: false, groupInfoList: payload.data }
    case GROUP_INFO.ERROR:
      return { ...state, groupInfoLoading: false }
    default:
      return state
  }
}
