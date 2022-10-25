import { TIESHEET, DELETE_TIESHEET } from '../actions'

const initialState: {
  tiesheetLoading: boolean
  tiesheetList: Array<object>
  deleteTiesheetLoading: boolean
} = {
  tiesheetLoading: false,
  tiesheetList: [],
  deleteTiesheetLoading: false,
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
    case DELETE_TIESHEET.LOADING:
      return { ...state, deleteTiesheetLoading: true }
    case DELETE_TIESHEET.SUCCESS:
      return { ...state, deleteTiesheetLoading: false }
    case DELETE_TIESHEET.ERROR:
      return { ...state, deleteTiesheetLoading: false }
    default:
      return state
  }
}
