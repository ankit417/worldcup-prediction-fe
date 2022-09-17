import { colors } from '../modules'

export const chipStatus = {
  active: {
    color: 'green',
    name: 'Active',
  },
  inActive: {
    color: '#EB3F05',
    name: 'In active',
  },
  advance: {
    color: '#EF7F44',
    name: 'Advance',
  },
  notPaid: {
    color: '#E15F5F',
    name: 'Not paid',
  },
  paid: {
    color: '#5B9540',
    name: 'Paid',
  },
  available: {
    color: '#5B9540',
    name: 'Available',
  },
  deactivated: {
    color: '#EF7F44',
    name: 'Deactivated',
  },
  checkedId: {
    color: '#5B9540',
    name: 'Checked In',
  },
  checkedOut: {
    color: '#EC3E43',
    name: 'Checked Out',
  },
  occupied: {
    color: colors.light.red,
    name: 'Occupied',
  },
  added: {
    color: '#5B9540',
    name: 'Added',
  },
  removed: {
    color: '#EC3E43',
    name: 'Removed',
  },
}
