import React from 'react'
import { fonts } from '../../../modules'
// import { fonts } from "../../../../modules";
// import { PaddingParams } from "../..";
import {
  withDefaultSpacingProps,
  PaddingParams,
} from '../withDefaultSpacingProps/withDefaultSpacingProps.common'

const getSize = (size: string) => {
  switch (size) {
    case 'large':
      return fonts.size.heading_large

    case 'small':
      return fonts.size.heading_small

    case 'medium':
      return fonts.size.heading_medium
    default:
      return fonts.size.text
  }
}

interface TitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  size?: string
}

export const Title = withDefaultSpacingProps<TitleProps>(
  ({ children, style, className, size }: TitleProps) => {
    return (
      <span
        className={`title ${className}`}
        style={{
          fontSize: getSize(size),
          ...style,
        }}
      >
        {children ? children : null}
      </span>
    )
  }
)
