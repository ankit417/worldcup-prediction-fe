export const Detail = ({
  title,
  data,
  style,
}: {
  title: string
  data: React.ReactNode
  style?: React.CSSProperties
}) => {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: 14,
        margin: '20px 0',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          fontWeight: 900,
        }}
      >
        {title}:
      </div>{' '}
      <div
        style={{
          marginLeft: 10,
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        {data ?? null}
      </div>
    </div>
  )
}
