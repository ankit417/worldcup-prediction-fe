import {
  GET_ALL_ORDERS,
  GET_ORDER_BY_ID,
  //   ADD_ORDER,
  // DELETE_ORDER,
  //   ADD_ORDER_ITEM_TO_ORDER,
  //   UPDATE_ORDER,
  GET_ORDERS_BY_BOOKING_ID,
  //   CHANGE_ORDER_PAID_STATUS,
  //   UPDATE_ORDER_ITEM,
  //   DELETE_ORDER_ITEM,
  GET_ORDER_ITEM_BY_ID,
  CHANGE_ORDER_PAID_STATUS,
  DELETE_ORDER,
} from '../actions'

const initalState: {
  orderListLoading: boolean
  orderList: Array<object>
  orderListTotalCount: number

  orderDetailLoading: boolean
  orderDetail: object

  orderItemList: Array<object>
  orderItemListLoading: boolean

  orderItemLoading: boolean
  orderItem: any

  orderBookingDetail: object

  deleteOrderLoading: boolean
  orderDeleteLoading: boolean
} = {
  orderListLoading: true,
  orderList: [],
  orderListTotalCount: 0,

  orderDetailLoading: false,
  orderDetail: {},

  orderItem: {},
  orderItemLoading: false,
  orderItemList: [],
  orderItemListLoading: false,

  orderBookingDetail: {},

  // USED IN OTHER PLACES
  deleteOrderLoading: false,

  // LOADING FOR ACTUAL ORDER DELETE
  orderDeleteLoading: false,
}

export function ordersReducer(state = initalState, action: any) {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_ORDERS.LOADING:
      return { ...state, orderListLoading: true }
    case GET_ALL_ORDERS.SUCCESS:
      return {
        ...state,
        orderListLoading: false,
        orderList: payload.data,
        orderListTotalCount: payload.total,
      }
    case GET_ALL_ORDERS.ERROR:
      return { ...state, orderListLoading: false }

    case GET_ORDER_BY_ID.LOADING:
      return { ...state, orderDetailLoading: true, orderDetail: {} }
    case GET_ORDER_BY_ID.SUCCESS:
      return {
        ...state,
        orderDetailLoading: false,
        orderDetail: payload,
        orderDetailTotalCount: payload.total,
      }
    case GET_ORDER_BY_ID.ERROR:
      return { ...state, orderDetailLoading: false }

    case GET_ORDER_ITEM_BY_ID.LOADING:
      return { ...state, orderItemLoading: true }
    case GET_ORDER_ITEM_BY_ID.SUCCESS:
      return {
        ...state,
        orderItemLoading: false,
        orderItem: payload,
      }
    case GET_ORDER_ITEM_BY_ID.ERROR:
      return { ...state, orderItemLoading: false }

    case CHANGE_ORDER_PAID_STATUS.LOADING:
      return { ...state, deleteOrderLoading: true }
    case CHANGE_ORDER_PAID_STATUS.SUCCESS:
      return {
        ...state,
        deleteOrderLoading: false,
      }
    case CHANGE_ORDER_PAID_STATUS.ERROR:
      return { ...state, deleteOrderLoading: false }

    case GET_ORDERS_BY_BOOKING_ID.LOADING:
      return { ...state, orderBookingDetail: {} }
    case GET_ORDERS_BY_BOOKING_ID.SUCCESS:
      return {
        ...state,
        orderBookingDetail: payload,
      }
    case GET_ORDERS_BY_BOOKING_ID.ERROR:
      return { ...state, orderBookingDetail: {} }

    case DELETE_ORDER.LOADING:
      return {
        ...state,
        orderDeleteLoading: true,
      }

    case DELETE_ORDER.SUCCESS:
      return {
        ...state,
        orderDeleteLoading: false,
      }

    case DELETE_ORDER.ERROR:
      return {
        ...state,
        orderDeleteLoading: false,
      }
    default:
      return state
  }
}
