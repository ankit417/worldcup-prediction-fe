import imgUrl from '../../../assets/images/stock.png'

export function StockImg() {
  return (
    <img
      src={imgUrl}
      alt="stock"
      style={{
        display: 'block',
        objectFit: 'contain',
        height: 100,
      }}
    />
  )
}
