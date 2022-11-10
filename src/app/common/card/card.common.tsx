import React from 'react'
import { Box, Title /* Button */ } from '../../common'
import { Button } from '../button/button.common'

interface CardProps {
  children: React.ReactNode
  containerStyle?: any
  title?: string | React.ReactNode
  buttonLabel?: string
  noPadding?: any
  onActionPress?: () => void
  buttonStyle?: any
  containerClass?: string
}
export const Card = (props: CardProps) => {
  const {
    children,
    containerStyle,
    title,
    buttonLabel,
    noPadding,
    onActionPress,
    buttonStyle,
    containerClass = '',
  } = props
  return (
    <Box className={`card-container ${containerClass}`} style={containerStyle}>
      {(buttonLabel || title) && (
        <Box
          className="header"
          pl={20}
          pr={20}
          flexBox
          jSpace
          alCenter
          style={{
            paddingTop: !title && 10,
            paddingBottom: !title && 10,
            paddingRight: 20,
          }}
        >
          <Title size="small" p={20}>
            {title}
          </Title>
          {buttonLabel && (
            <Button
              title={buttonLabel}
              onClick={onActionPress}
              style={buttonStyle}
            />
          )}
        </Box>
      )}
      <Box className="body" p={!noPadding ? 20 : 0}>
        {children ? children : null}
      </Box>
    </Box>
  )
}
