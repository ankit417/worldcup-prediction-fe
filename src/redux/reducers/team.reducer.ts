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
      return { ...state, teamLoading: true }
    case TEAM.SUCCESS:
      return {
        ...state,
        teamLoading: false,
        teamList: payload.data,
      }
    case TEAM.ERROR:
      return { ...state, teamLoading: false }
    default:
      return state
  }
}
