import { PREDICTION } from '../actions'

const initialState: {
  predictionLoading: boolean
  predictionList: Array<object>
} = {
  predictionLoading: false,
  predictionList: [],
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
    default:
      return state
  }
}
