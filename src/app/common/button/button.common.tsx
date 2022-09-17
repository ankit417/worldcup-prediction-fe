import { ReactNode, useRef, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { SpringCore, AnimatedBlock } from 'react-ui-animate'

import { Text } from '..'
import { capitalizeFirstLetter } from '../../../utils'

const { useTransition } = SpringCore

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
  onClick?: (arg: any) => void
  type?: string
  style?: any
  loading?: boolean
}

export const Button = ({
  title,
  leftIcon,
  rightIcon,
  className,
  type = 'button',
  loading,
  ...rest
}: ButtonProps) => {
  const _className = ['button']
  _className.push('default')
  if (className) _className.push(className)

  return (
    <button className={_className.join(' ')} {...rest}>
      {loading && (
        <Text button style={{ marginRight: 4 }}>
          <LoaderIcon />
        </Text>
      )}
      {leftIcon && (
        <Text button style={{ marginRight: 4 }}>
          {leftIcon}
        </Text>
      )}
      {title && <Text button>{capitalizeFirstLetter(title)}</Text>}
      {rightIcon && (
        <Text button style={{ marginLeft: 4 }}>
          {rightIcon}
        </Text>
      )}
    </button>
  )
}

interface IconProps {
  icon?: ReactNode
  rightIcon?: ReactNode
  className?: string
  onClick?: (arg?: any) => void
  style?: any
}

const IconButton = (props: IconProps) => {
  const { icon, className, ...rest } = props

  const _className = ['button']
  _className.push('icon')
  if (className) _className.push(className)

  return (
    <button className={_className.join(' ')} {...rest}>
      {icon && <Text button>{icon}</Text>}
    </button>
  )
}

const RippleButton = ({
  title,
  leftIcon,
  rightIcon,
  className,
  onClick,
  type = 'button',
  loading,
  ...rest
}: ButtonProps) => {
  const [ripples, setRipples] = useState<any>([])
  const key = useRef<any>(0)
  const trasitions = useTransition(ripples, {
    from: { scale: 0, opacity: 1 },
    enter: (item: any) => async (next: any) => {
      await next({
        scale: 2.5,
        opacity: 0,
        config: { duration: 500 },
        onRest: function () {
          setRipples((prev: any) =>
            prev.filter((val: any) => val.key !== item.key)
          )
        },
      })
    },
  })

  const handleRipple = (e: any) => {
    key.current = key.current + 1
    var viewportOffset = e.currentTarget.getBoundingClientRect()
    var top = viewportOffset.top
    var left = viewportOffset.left
    const ripplesClone = [
      ...ripples,
      {
        key: key.current,
        x: e.clientX - left - 50,
        y: e.clientY - top - 50,
      },
    ]
    setRipples(ripplesClone)
  }

  const _className = ['button']
  _className.push('ripple')
  if (className) _className.push(className)

  return (
    <button
      className={_className.join(' ')}
      {...rest}
      onMouseDown={(e) => {
        handleRipple(e)
      }}
      onMouseUp={(e) => {
        onClick && onClick(e)
      }}
    >
      {loading && (
        <Text button style={{ marginRight: 4 }}>
          <LoaderIcon />
        </Text>
      )}
      {leftIcon && (
        <Text button style={{ marginRight: 4 }}>
          {leftIcon}
        </Text>
      )}
      {title && <Text button>{capitalizeFirstLetter(title)}</Text>}
      {rightIcon && (
        <Text button style={{ marginLeft: 4 }}>
          {rightIcon}
        </Text>
      )}
      {trasitions(({ scale, opacity }: any, item: any) => {
        return (
          <AnimatedBlock
            className="rippleoverlay"
            style={{
              left: item.x,
              top: item.y,
              scale,
              opacity,
              pointerEvents: 'none',
            }}
          />
        )
      })}
    </button>
  )
}

Button.Icon = IconButton
Button.Ripple = RippleButton
