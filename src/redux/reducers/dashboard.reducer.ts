import {
  GET_PAYMENTS,
  GET_PAYMENT_LIST,
  GET_TOTAL_REVENUE,
  GET_LATEST_ORDERS,
  GET_LATEST_BOOKINGS,
} from '../actions'

export interface InitialState {
  totalRevenue: number
  totalRevenueLoading: boolean
  orderRevenue: number
  bookingRevenue: number
  payments: {
    card: number
    fonepay: number
    cash: number
  }
  paymentsLoading: boolean
  orderCount: number
  bookingCount: number
  paymentList: object[]
  paymentListLoading: boolean
  paymentListTotal: number
  latestOrderList: object[]
  latestOrderListLoading: boolean
  latestRoomBookingList: object[]
  latestRoomBookingListLoading: boolean
}

const initialState: InitialState = {
  totalRevenue: 0,
  orderRevenue: 0,
  bookingRevenue: 0,
  totalRevenueLoading: false,
  payments: {
    card: 0,
    fonepay: 0,
    cash: 0,
  },
  paymentsLoading: false,
  orderCount: 0,
  bookingCount: 0,
  paymentList: [],
  paymentListLoading: false,
  paymentListTotal: 0,
  latestOrderList: [],
  latestOrderListLoading: false,
  latestRoomBookingList: [],
  latestRoomBookingListLoading: false,
}

export function dashboardReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    // TOTAL REVENUE SECTION
    case GET_TOTAL_REVENUE.LOADING:
      return {
        ...state,
        totalRevenueLoading: true,
      }
    case GET_TOTAL_REVENUE.SUCCESS:
      return {
        ...state,
        totalRevenue: payload.total_revenue,
        orderRevenue: payload.order_revenue,
        bookingRevenue: payload.booking_revenue,
        totalRevenueLoading: false,
        orderCount: payload.total_order,
        bookingCount: payload.total_booking,
      }
    case GET_TOTAL_REVENUE.ERROR:
      return {
        ...state,
        totalRevenueLoading: false,
      }
    // PAYMENTS SECTION
    case GET_PAYMENTS.LOADING:
      return {
        ...state,
        paymentsLoading: true,
      }
    case GET_PAYMENTS.SUCCESS:
      return {
        ...state,
        payments: payload.payments,
        paymentsLoading: false,
        ordersTotal: payload.orders_total,
        bookingTotal: payload.booking_total,
      }
    case GET_PAYMENTS.ERROR:
      return {
        ...state,
        paymentsLoading: false,
      }

    // PAYMENT LIST SECTION
    case GET_PAYMENT_LIST.CLEAR:
      return {
        ...state,
        paymentList: [],
      }
    case GET_PAYMENT_LIST.LOADING:
      return {
        ...state,
        paymentListLoading: true,
      }
    case GET_PAYMENT_LIST.SUCCESS:
      return {
        ...state,
        paymentList: payload.rows,
        paymentListLoading: false,
        paymentListTotal: payload.total,
      }
    case GET_PAYMENT_LIST.ERROR:
      return {
        ...state,
        paymentListLoading: false,
      }

    // LATEST ORDER LIST SECTION
    case GET_LATEST_ORDERS.LOADING:
      return {
        ...state,
        latestOrderListLoading: true,
      }
    case GET_LATEST_ORDERS.SUCCESS:
      return {
        ...state,
        latestOrderListLoading: false,
        latestOrderList: payload.rows,
      }

    case GET_LATEST_ORDERS.ERROR:
      return {
        ...state,
        latestOrderListLoading: false,
      }

    // LATEST ROOM BOOKING LIST

    case GET_LATEST_BOOKINGS.LOADING:
      return {
        ...state,
        latestRoomBookingListLoading: true,
      }
    case GET_LATEST_BOOKINGS.ERROR:
      return {
        ...state,
        latestRoomBookingListLoading: false,
      }
    case GET_LATEST_BOOKINGS.SUCCESS:
      return {
        ...state,
        latestRoomBookingList: payload.rows,
        latestRoomBookingListLoading: false,
      }
    default:
      return state
  }
}
