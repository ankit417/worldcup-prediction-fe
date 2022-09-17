import {
  ROOM_LIST,
  ROOM_DETAIL,
  ADD_ROOM,
  DELETE_ROOM,
  EDIT_ROOM,
  AVAILABLE_ROOM_LIST,
} from '../actions'

const initalState: any = {
  availableRoomListLoading: false,
  availableRoomList: [],
  roomListLoading: false,
  roomList: [],
  totalCount: null,

  detail: null,
  detailLoading: false,

  addLoading: false,

  editLoading: false,

  deleteLoading: false,
}

export function roomReducer(state = initalState, action: any) {
  const { type, payload } = action
  switch (type) {
    case ROOM_LIST.CLEAR:
      return {
        ...state,
        roomListLoading: true,
        roomList: [],
      }
    case ROOM_LIST.LOADING:
      return { ...state, roomListLoading: true, roomList: [] }
    case ROOM_LIST.SUCCESS:
      return {
        ...state,
        roomListLoading: false,
        roomList: payload,
        totalCount: +payload.total,
      }
    case ROOM_LIST.ERROR:
      return { ...state, roomListLoading: false }

    case AVAILABLE_ROOM_LIST.CLEAR:
      return {
        ...state,
        availableRoomListLoading: true,
        availableRoomList: [],
      }
    case AVAILABLE_ROOM_LIST.LOADING:
      return { ...state, availableRoomListLoading: true, availableRoomList: [] }
    case AVAILABLE_ROOM_LIST.SUCCESS:
      return {
        ...state,
        availableRoomListLoading: false,
        availableRoomList: payload,
        totalCount: +payload.total,
      }
    case AVAILABLE_ROOM_LIST.ERROR:
      return { ...state, availableRoomListLoading: false }

    case ROOM_DETAIL.LOADING:
      return { ...state, detailLoading: true, detail: null }
    case ROOM_DETAIL.SUCCESS:
      return {
        ...state,
        detailLoading: false,
        detail: payload,
      }
    case ROOM_DETAIL.ERROR:
      return { ...state, detailLoading: false }

    case ADD_ROOM.LOADING:
      return { ...state, addLoading: true }
    case ADD_ROOM.SUCCESS:
      return {
        ...state,
        addLoading: false,
      }
    case ADD_ROOM.ERROR:
      return { ...state, addLoading: false }

    case EDIT_ROOM.LOADING:
      return { ...state, editLoading: true }
    case EDIT_ROOM.SUCCESS:
      return {
        ...state,
        editLoading: false,
      }
    case EDIT_ROOM.ERROR:
      return { ...state, editLoading: false }

    case DELETE_ROOM.LOADING:
      return { ...state, deleteLoading: true }
    case DELETE_ROOM.SUCCESS: {
      const roomListClone = [...state.roomList].filter(
        ({ ROOM_DETAILs }) => ROOM_DETAILs?.id !== payload
      )
      return {
        ...state,
        deleteLoading: false,
        roomList: roomListClone,
      }
    }
    case DELETE_ROOM.CLEAR: {
      return {
        ...state,
        deleteLoading: false,
      }
    }
    case DELETE_ROOM.ERROR:
      return { ...state, deleteLoading: false }

    default:
      return state
  }
}
