import { TOURNAMENT } from '../actions'

const initialState: {
  tournamentLoading: boolean
  tournamentList: Array<object>
} = {
  tournamentLoading: false,
  tournamentList: [],
}

export function tournamentReducer(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case TOURNAMENT.LOADING:
      return { ...state, tournamentLoading: true }
    case TOURNAMENT.SUCCESS:
      return {
        ...state,
        tournamentLoading: false,
        tournamentList: payload.data,
      }
    case TOURNAMENT.ERROR:
      return { ...state, tournamentLoading: false }
    default:
      return state
  }
}
