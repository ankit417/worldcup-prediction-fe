import { GET_TIESHEET_PREDICTION } from '../actions'

const initialState: {
  tiesheetPredictionLoading: boolean
  tiesheetPredictionList: Array<object>
} = {
  tiesheetPredictionLoading: false,
  tiesheetPredictionList: [],
}

export function tiesheetPredictionReducer(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case GET_TIESHEET_PREDICTION.LOADING:
      return { ...state, tiesheetPredictionLoading: true }
    case GET_TIESHEET_PREDICTION.SUCCESS:
      return {
        ...state,
        tiesheetPredictionList: payload.data,
        tiesheetPredictionLoading: false,
      }
    case GET_TIESHEET_PREDICTION.ERROR:
      return { ...state, tiesheetPredictionLoading: false }
    default:
      return state
  }
}
