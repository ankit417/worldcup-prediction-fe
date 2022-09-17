import { Chip } from '../../common'

interface Props {
  name: string
  color: string
  style?: object
}
export function CommonChip(props: Props) {
  return (
    <Chip
      style={{
        background: props.color,
        ...props.style,
      }}
    >
      {props.name}
    </Chip>
  )
}
