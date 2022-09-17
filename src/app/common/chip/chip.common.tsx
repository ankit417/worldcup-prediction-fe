import React from 'react'
import { PaddingParams } from '../index'

interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export const Chip = ({ children, style, className }: ChipProps) => {
  return (
    <span
      className={`chip ${className}`}
      style={{
        lineHeight: 1,
        ...style,
      }}
    >
      {children ? children : null}
    </span>
  )
}

Chip.defaultProps = {
  pl: 8,
  pr: 8,
  pt: 5,
  pb: 5,
  m: 0,
}
