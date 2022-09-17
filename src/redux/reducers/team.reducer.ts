import { TEAM } from '../actions'

const initialState: {
  teamLoading: boolean
  teamList: Array<object>
} = {
  teamLoading: false,
  teamList: [],
}

export function teamReducer(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case TEAM.LOADING:
      return { ...state, groupLoading: true }
    case TEAM.SUCCESS:
      return {
        ...state,
        groupLoading: false,
        groupList: payload.data,
      }
    case TEAM.ERROR:
      return { ...state, groupLoading: false }
    default:
      return state
  }
}
