import { GAME } from '../actions'

const initialState: {
  gameLoading: boolean
  gameList: Array<object>
} = {
  gameLoading: false,
  gameList: [],
}

export function gameReducer(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case GAME.LOADING:
      return { ...state, gameLoading: true }
    case GAME.SUCCESS:
      return {
        ...state,
        gameLoading: false,
        gameList: payload.data,
      }
    case GAME.ERROR:
      return { ...state, gameLoading: false }
    default:
      return state
  }
}
