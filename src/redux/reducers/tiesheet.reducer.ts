import { TIESHEET } from '../actions'

const initialState: {
  tiesheetLoading: boolean
  tiesheetList: Array<object>
} = {
  tiesheetLoading: false,
  tiesheetList: [],
}

export function tieSheetReducer(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case TIESHEET.LOADING:
      return { ...state, tiesheetLoading: true }
    case TIESHEET.SUCCESS:
      return {
        ...state,
        tiesheetLoading: false,
        tiesheetList: payload.data,
      }
    case TIESHEET.ERROR:
      return { ...state, tiesheetLoading: false }
    default:
      return state
  }
}
