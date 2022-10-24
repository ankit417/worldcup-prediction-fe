import { combineReducers } from 'redux'
import { loginReducer } from './login.reducer'

import { userReducer } from './user.reducer'
import { dashboardReducer } from './dashboard.reducer'

import { tournamentReducer } from './tournament.reducer'
import { groupReducer } from './group.reducer'
import { teamReducer } from './team.reducer'
import { gameReducer } from './game.reducer'
import { tieSheetReducer } from './tiesheet.reducer'
import { predictionReducer } from './prediction.reducer'
import { tiesheetPredictionReducer } from './tiesheetPrediction.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  dashboard: dashboardReducer,
  tournament: tournamentReducer,
  group: groupReducer,
  team: teamReducer,
  game: gameReducer,
  tiesheet: tieSheetReducer,
  prediction: predictionReducer,
  tiesheetPrediction: tiesheetPredictionReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
