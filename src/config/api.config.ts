import { apiGenerator } from '../helpers'

// // export const LOCAL_SERVER_URL = 'http://localhost:8848/api'
// export const BASE_URL = 'http://localhost:8081/api/v1' // Dev Server API -
// export const FILE_URL = 'http://localhost:8081/files/' // Dev Server API -

export const BASE_URL = 'http://167.172.84.100:8081/api/v1' // Dev Server API -
export const FILE_URL = 'http://167.172.84.100:8081/files/' // Dev Server API -
// export const BASE_URL = 'http://localhost:8081/api/v1' // Dev Server API -
// export const FILE_URL = 'http://localhost:8081/files/' // Dev Server API -

export const TABLE_LIMIT = 5

// API FUNCTION
export const api: any = apiGenerator({ baseURL: BASE_URL })

// API PATHS
export const APIS = {
  login: '/auth/login',
  logout: '/auth/logout',
  forget: 'auth/forget',
  register: 'auth/register',
  stock: '/stock',
  verify: '/auth/verify',
  forgot: '/auth/forget',

  change: '/auth/change',

  common: '/common',

  order: '/order',

  room: '/room',
  roomBookings: '/room-book',
  customer: '/customer',

  category: '/menu',
  dashboard: '/status-board',

  tournament: '/tournament',
  group: '/groups',
  team: '/teams',
  game: '/game',
  tiesheet: '/tiesheet',
  prediction: '/prediction/p',
  userPrediction: '/prediction/predicted',
  user: '/auth/user',
  predictGame: 'prediction/predict',
  userTiesheetPredictions: '/tiesheetprediction',
  userTiesheetPredictionsById: '/tiesheetprediction',
  groupInfo: '/groups/group',
  userlist: '/auth/userlist',
  userinfo: '/auth/userinfo',
  createUser: '/auth/createuser',
  deleteuser: '/auth/deleteuser',
  edituser: '/auth/edituser',
  changepassword: '/auth/changepassword',
  predictionProfile: '/prediction/predictedbyuser',
  resetpassword: '/auth/resetpassword',
  leaderboardsetting: '/tournament/leaderboardsetting',
}
