export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
export const mapPaymentMethod = {
  0: 'all',
  1: 'cash',
  2: 'fonepay',
  3: 'card',
}

export const mapStringToPayment = {
  all: 0,
  cash: 1,
  fonepay: 2,
  card: 3,
}
