import { createActionSet } from '../../helpers'

//* AUTH
export const LOGIN = createActionSet('LOGIN')
export const LOGOUT = createActionSet('LOGOUT')
export const PASSWORD = createActionSet('PASSWORD')
export const USER = createActionSet('USER')
export const EDIT_USER_INFO = createActionSet('EDIT_USER_INFO')
export const RESET_PASSWORD = createActionSet('RESET_PASSWORD')

export const FORGET_PASSWORD = createActionSet('FORGET_PASSWORD')
export const CHANGE_PASSWORD = createActionSet('CHANGE_PASSWORD')

//* STOCK
export const STOCK_LIST = createActionSet('STOCK_LIST')
export const ALL_STOCK_LIST = createActionSet('ALL_STOCK_LIST')
export const STOCK_DETAIL = createActionSet('STOCK_DETAIL')
export const ADD_STOCK = createActionSet('ADD_STOCK')
export const EDIT_STOCK = createActionSet('EDIT_STOCK')
export const DELETE_STOCK = createActionSet('DELETE_STOCK')
export const GET_STOCK_HISTORY_LIST = createActionSet('GET_STOCK_HISTORY_LIST')
export const UPDATE_STOCK_QUANTITY = createActionSet('UPDATE_STOCK_QUANTITY')
export const SEARCH_STOCK = createActionSet('SEARCH_STOCK')
export const SEARCHED_HISTORY_LIST = createActionSet('SEARCHED_HISTORY_LIST')

//* HOTEL ROOM
export const ROOM_LIST = createActionSet('ROOM_LIST')
export const AVAILABLE_ROOM_LIST = createActionSet('AVAILABLE_ROOM_LIST')
export const ALL_ROOM_LIST = createActionSet('ALL_ROOM_LIST')
export const ROOM_DETAIL = createActionSet('ROOM_DETAIL')
export const ADD_ROOM = createActionSet('ADD_ROOM')
export const EDIT_ROOM = createActionSet('EDIT_ROOM')
export const DELETE_ROOM = createActionSet('DELETE_ROOM')

//* BOOKINGS
export const ADD_ROOM_BOOKING = createActionSet('ADD_ROOM_BOOKING')
export const ADD_ROOM_TO_BOOKING_LIST = createActionSet(
  'ADD_ROOM_TO_BOOKING_LIST'
)
export const DELETE_ROOM_FROM_BOOKING_LIST = createActionSet(
  'DELETE_ROOM_FROM_BOOKING_LIST'
)
export const UPDATE_BOOKED_ROOM_PRICE = createActionSet(
  'UPDATE_BOOKED_ROOM_PRICE'
)
export const UPDATE_CUSTOMER = createActionSet('UPDATE_CUSTOMER')
export const UPDATE_ROOM_BOOKING_DETAILS = createActionSet(
  'UPDATE_ROOM_BOOKING_DETAILS'
)
export const ROOM_BOOKING_LIST = createActionSet('ROOM_BOOKING_LIST')
export const ACTIVE_ROOM_BOOKING_LIST = createActionSet(
  'ACTIVE_ROOM_BOOKING_LIST'
)
export const ROOM_BOOKING_DETAIL = createActionSet('ROOM_BOOKING_DETAIL')
export const DELETE_ROOM_BOOKING = createActionSet('DELETE_ROOM_BOOKING')
export const CANCEL_ROOM_BOOKING = createActionSet('CANCEL_ROOM_BOOKING')

//* CATEGORIES
export const ADD_CATEGORY = createActionSet('ADD_CATEGORY')
export const ADD_MENU_ITEM_TO_CATEGORY = createActionSet(
  'ADD_MENU_ITEM_TO_CATEGORY'
)
export const GET_ALL_CATEGORIES = createActionSet('GET_ALL_CATEGORIES')
export const UPDATE_CATEGORY = createActionSet('UPDATE_CATEGORY')
export const GET_CATEGORY_BY_ID = createActionSet('GET_CATEGORY_BY_ID')
export const CHANGE_CATEGORY_DELETE_STATUS = createActionSet(
  'CHANGE_CATEGORY_DELETE_STATUS'
)
export const GET_ACTIVE_CATEGORIES = createActionSet('GET_ACTIVE_CATEGORIES')
export const GET_INACTIVE_CATEGORIES = createActionSet(
  'GET_INACTIVE_CATEGORIES'
)

//* MENU ITEMS
export const ADD_MENU_ITEM = createActionSet('ADD_MENU_ITEM')
export const UPDATE_MENU_ITEM = createActionSet('UPDATE_MENU_ITEM')
export const GET_MENU_ITEM_BY_ID = createActionSet('GET_MENU_ITEM_BY_ID')
export const GET_ALL_MENU_ITEM = createActionSet('GET_ALL_MENU_ITEM')
export const GET_ACTIVE_MENU_ITEM = createActionSet('GET_ACTIVE_MENU_ITEM')
export const GET_INACTIVE_MENU_ITEM = createActionSet('GET_INACTIVE_MENU_ITEM')
export const SEARCH_MENU_ITEM = createActionSet('SEARCH_MENU_ITEM')
export const CHANGE_MENU_ITEM_DELETE_STATUS = createActionSet(
  'CHANGE_MENU_ITEM_DELETE_STATUS'
)

// DASHBOARD
export const GET_TOTAL_REVENUE = createActionSet('GET_TOTAL_REVENUE')
export const GET_PAYMENTS = createActionSet('GET_PAYMENTS')
export const GET_PAYMENT_LIST = createActionSet('GET_PAYMENT_LIST')
export const GET_LATEST_ORDERS = createActionSet('GET_LATEST_ORDERS')
export const GET_LATEST_BOOKINGS = createActionSet('GET_LATEST_BOOKINGS')

//* ORDERS
export const ADD_ORDER = createActionSet('ADD_ORDER')
export const DELETE_ORDER = createActionSet('DELETE_ORDER')
export const ADD_ORDER_ITEM_TO_ORDER = createActionSet(
  'ADD_ORDER_ITEM_TO_ORDER'
)
export const GET_ALL_ORDERS = createActionSet('GET_ALL_ORDERS')
export const UPDATE_ORDER = createActionSet('UPDATE_ORDER')
export const GET_ORDER_BY_ID = createActionSet('GET_ORDER_BY_ID')
export const GET_ORDERS_BY_BOOKING_ID = createActionSet(
  'GET_ORDERS_BY_BOOKING_ID'
)
export const CHANGE_ORDER_PAID_STATUS = createActionSet(
  'CHANGE_ORDER_PAID_STATUS'
)

//* ORDER ITEMS
export const ADD_ORDER_ITEM = createActionSet('ADD_ORDER_ITEM')
export const UPDATE_ORDER_ITEM = createActionSet('UPDATE_ORDER_ITEM')
export const GET_ALL_ORDER_ITEM = createActionSet('GET_ALL_ORDER_ITEM')
export const DELETE_ORDER_ITEM = createActionSet('DELETE_ORDER_ITEM')
export const GET_ORDER_ITEM_BY_ID = createActionSet('GET_ORDER_ITEM_BY_ID')

//TOURNAMENTS
export const TOURNAMENT = createActionSet('TOURNAMENT')
export const ADD_TOURNAMENT = createActionSet('ADD_TOURNAMENT')
export const EDIT_TOURNAMENT = createActionSet('EDIT_TOURNAMENT')

//GROUP
export const GROUP = createActionSet('GROUP')
export const ADD_GROUP = createActionSet('ADD_GROUP')
export const EDIT_GROUP = createActionSet('EDIT_GROUP')
export const DELETE_GROUP = createActionSet('DELETE_GROUP')

//TEAM
export const TEAM = createActionSet('TEAM')
export const ADD_TEAM = createActionSet('ADD_TEAM')
export const EDIT_TEAM = createActionSet('EDIT_TEAM')
export const DELETE_TEAM = createActionSet('DELETE_TEAM')

//GAME
export const GAME = createActionSet('GAME')
