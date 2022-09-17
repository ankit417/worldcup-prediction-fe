import { FILE_URL } from '../../../../config'

export const mapService = {
  orders: 'orders',
  room_booking: 'rooms',
}

export const getActionButtonUrl = (
  type: string,
  data: { id: number; payload: string }
) => {
  let url = {
    view: '',
    invoice: '',
  }
  // /hotel/booking/15, /assets/room-booking/10/invoice.pdf
  // /order/14/view, /assets/order/10/invoice.pdf

  if (type === 'orders') {
    url = {
      view: `/order/${data.id}/view`,
      invoice: `${FILE_URL}/order/${data.payload}`,
    }
  } else if (type === 'room_booking') {
    url = {
      view: `/hotel/booking/${data.id}`,
      invoice: `${FILE_URL}/room-booking/${data.payload}`,
    }
  }

  return url
}

export const TYPE = {
  roomBooking: 'room_booking',
  orders: 'orders',
  all: ['room_booking', 'orders'],
}
