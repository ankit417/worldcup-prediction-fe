import { combineReducers } from 'redux'
import { loginReducer } from './login.reducer'

import { stockReducer } from './stock.reducer'
import { userReducer } from './user.reducer'
import { roomReducer } from './room.reducer'
import { bookingsReducer } from './bookings.reducer'
import { categoriesReducer } from './category.reducer'
import { dashboardReducer } from './dashboard.reducer'
import { ordersReducer } from './order.reducer'

import { tournamentReducer } from './tournament.reducer'
import { groupReducer } from './group.reducer'
const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
  login: loginReducer,
  stock: stockReducer,
  bookings: bookingsReducer,
  category: categoriesReducer,
  dashboard: dashboardReducer,
  order: ordersReducer,
  tournament: tournamentReducer,
  group: groupReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
