import { apiGenerator } from '../helpers'

// // export const LOCAL_SERVER_URL = 'http://localhost:8848/api'
export const BASE_URL = 'http://localhost:8081/api/v1' // Dev Server API -
export const FILE_URL = 'http://143.110.251.101:8849/assets' // Dev FILE URL

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
  user: '/users',

  common: '/common',

  order: '/order',

  room: '/room',
  roomBookings: '/room-book',
  customer: '/customer',

  category: '/menu',
  dashboard: '/status-board',

  tournament: '/tournament',
  group: '/groups',
}
