import React from 'react'
import { fonts } from '../../../modules'
import { PaddingParams } from '../../common'

interface PargraphProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  size?: number
  color?: string
}

export const Paragraph = ({
  children,
  style,
  className,
  color,
  size = fonts.size.text,
  ...rest
}: PargraphProps) => {
  return (
    <span
      {...rest}
      className={`p ${className}`}
      style={{
        color,
        fontSize: size,
        ...style,
      }}
    >
      {children ? children : null}
    </span>
  )
}
