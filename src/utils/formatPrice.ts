export function formatPrice(num: number, formatType = 'en-IN') {
  const price = new Intl.NumberFormat(formatType).format(num)

  return price
}
