import { GROUP } from '../actions'

const initialState: {
  groupLoading: boolean
  groupList: Array<object>
} = {
  groupLoading: false,
  groupList: [],
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
    default:
      return state
  }
}
