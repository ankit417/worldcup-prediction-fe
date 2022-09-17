import {
  ROOM_BOOKING_LIST,
  ACTIVE_ROOM_BOOKING_LIST,
  ROOM_BOOKING_DETAIL,
  DELETE_ROOM_BOOKING,
  CANCEL_ROOM_BOOKING,
} from '../actions'

const initalState: {
  deleteRoomBookingLoading: boolean

  roomBookingsListLoading: boolean
  roomBookingsList: Array<object>
  roomBookingsListTotalCount: number

  activeRoomBookingsListLoading: boolean
  activeRoomBookingsList: Array<object>

  roomBookingDetailLoading: boolean
  roomBookingDetail: object
  cancelRoomBookingLoading: boolean
} = {
  deleteRoomBookingLoading: false,

  roomBookingsListLoading: true,
  roomBookingsList: [],
  roomBookingsListTotalCount: 0,

  activeRoomBookingsListLoading: false,
  activeRoomBookingsList: [],

  roomBookingDetailLoading: false,
  roomBookingDetail: {},
  cancelRoomBookingLoading: false,
}

export function bookingsReducer(state = initalState, action: any) {
  const { type, payload } = action

  switch (type) {
    case ROOM_BOOKING_LIST.LOADING:
      return { ...state, roomBookingsListLoading: true }
    case ROOM_BOOKING_LIST.SUCCESS:
      return {
        ...state,
        roomBookingsListLoading: false,
        roomBookingsList: payload.data,
        roomBookingsListTotalCount: payload.total,
      }
    case ROOM_BOOKING_LIST.ERROR:
      return { ...state, roomBookingsListLoading: false }

    case ACTIVE_ROOM_BOOKING_LIST.LOADING:
      return { ...state, activeRoomBookingsListLoading: true }
    case ACTIVE_ROOM_BOOKING_LIST.SUCCESS:
      return {
        ...state,
        activeRoomBookingsListLoading: false,
        activeRoomBookingsList: payload,
      }
    case ACTIVE_ROOM_BOOKING_LIST.ERROR:
      return { ...state, activeRoomBookingsListLoading: false }

    case ROOM_BOOKING_DETAIL.LOADING:
      return { ...state, roomBookingDetailLoading: true }
    case ROOM_BOOKING_DETAIL.SUCCESS:
      return {
        ...state,
        roomBookingDetailLoading: false,
        roomBookingDetail: payload,
        roomBookingDetailTotalCount: payload.total,
      }
    case ROOM_BOOKING_DETAIL.ERROR:
      return { ...state, roomBookingDetailLoading: false }

    case DELETE_ROOM_BOOKING.LOADING:
      return { ...state, deleteRoomBookingLoading: true }
    case DELETE_ROOM_BOOKING.SUCCESS:
      return {
        ...state,
        deleteRoomBookingLoading: false,
      }
    case DELETE_ROOM_BOOKING.ERROR:
      return { ...state, deleteRoomBookingLoading: false }

    case CANCEL_ROOM_BOOKING.LOADING:
      return { ...state, cancelRoomBookingLoading: true }
    case CANCEL_ROOM_BOOKING.SUCCESS:
      return {
        ...state,
        cancelRoomBookingLoading: false,
      }
    case CANCEL_ROOM_BOOKING.ERROR:
      return { ...state, cancelRoomBookingLoading: false }

    default:
      return state
  }
}
