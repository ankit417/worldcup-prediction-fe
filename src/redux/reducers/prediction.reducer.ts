import { PREDICTION, USER_PREDICTION } from '../actions'

const initialState: {
  predictionLoading: boolean
  predictionList: Array<object>
  userPredictionLoading: boolean
  userPredictionList: Array<object>
} = {
  predictionLoading: false,
  predictionList: [],
  userPredictionLoading: false,
  userPredictionList: [],
}

export function predictionReducer(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case PREDICTION.LOADING:
      return { ...state, predictionLoading: true }
    case PREDICTION.SUCCESS:
      return {
        ...state,
        predictionLoading: false,
        predictionList: payload.data,
      }
    case PREDICTION.ERROR:
      return { ...state, predictionLoading: false }
    case USER_PREDICTION.LOADING:
      return { ...state, userPredictionLoading: true }
    case USER_PREDICTION.SUCCESS:
      return {
        ...state,
        userPredictionLoading: false,
        userPredictionList: payload.data,
      }
    case USER_PREDICTION.ERROR:
      return { ...state, userPredictionLoading: false }
    default:
      return state
  }
}
