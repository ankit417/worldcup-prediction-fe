import React, { ReactNode, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
// import { BiSearch } from "react-icons/all";

import { Title, Box } from '../index'

interface InputFieldProps {
  name: string
  value?: string | number
  defaultValue?: string | number
  placeholder: string
  style?: any
  boxStyle?: any
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  type: string
  disabled?: boolean
  error?: any
  lefticon?: ReactNode
  righticon?: ReactNode
  required?: boolean
  maxLength?: number
  max?: string | number
  min?: string | number
  absolute?: boolean
  onBlurHandler?: any
  onFocusHandler?: any
  isPasswordInputField?: boolean
}
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false)
    const [inputPasswordType, setInputPasswordType] = useState('password')
    const toggleVisiblePassword = (show: boolean, type: string) => {
      setShowPassword(show)
      setInputPasswordType(type)
    }
    const {
      // value,
      name,
      defaultValue,
      placeholder,
      style,
      onChange,
      className,
      type,
      disabled,
      error,
      lefticon,
      righticon,
      boxStyle,
      maxLength,
      onBlurHandler,
      onFocusHandler,
      absolute,
      isPasswordInputField,
      ...rest
    } = props
    return (
      <>
        <Box
          className={` inputfield ${className} ${isFocused && 'isFocused'} ${
            disabled && `disabled`
          }  ${!!error && 'error'}`}
          style={{
            position: 'relative',
            ...boxStyle,
          }}
          flexBox
          row
          alCenter
          jSpace
          pl={6}
          pr={6}
          columnGap={5}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
        >
          {lefticon}
          <input
            name={name}
            ref={ref}
            defaultValue={defaultValue}
            onChange={onChange}
            style={style}
            placeholder={placeholder}
            type={isPasswordInputField ? inputPasswordType : type}
            disabled={disabled}
            onBlur={onBlurHandler}
            maxLength={maxLength}
            onFocus={onFocusHandler}
            onInput={
              type === 'number'
                ? (e: any) => {
                    if (maxLength) {
                      if (e.target.value.length > e.target.maxLength) {
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength
                        )
                      }
                    }
                    if (absolute) {
                      e.target.value = Math.abs(e.target.value)
                    }
                    if (e.target.value < 0) {
                      e.target.value = 0
                    }

                    // return e.target.value
                  }
                : (e: any) => e.target.value ?? e.currentTarget.value
            }
            // value={value}
            {...rest}
          />
          {/* {righticon} */}
          {isPasswordInputField && (
            <Box
              style={{
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                position: 'absolute',
                right: 0,
              }}
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={18}
                  cursor="pointer"
                  onClick={() => toggleVisiblePassword(true, 'text')}
                />
              ) : (
                <AiOutlineEye
                  fontSize={18}
                  cursor="pointer"
                  onClick={() => toggleVisiblePassword(false, 'password')}
                />
              )}
            </Box>
          )}
        </Box>
        {error}
      </>
    )
  }
)

export const InputFieldBorderless = React.forwardRef<
  HTMLInputElement,
  InputFieldProps
>((props, ref) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const {
    // value,
    name,
    defaultValue,
    placeholder,
    style,
    onChange,
    className,
    type,
    disabled,
    error,
    maxLength,
    ...rest
  } = props
  return (
    <input
      name={name}
      ref={ref}
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
      className={`inputfield borderless ${className} ${
        disabled && `disabled`
      }  ${isFocused && 'isFocused'} ${!!error && 'error'}`}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      onFocus={() => {
        setIsFocused(true)
      }}
      onBlur={() => {
        setIsFocused(false)
      }}
      maxLength={maxLength}
      onInput={
        maxLength &&
        ((e: any) => {
          if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        })
      }
      // value={value}
      {...rest}
    />
  )
})

interface TextAreaProps {
  name: string
  value?: string
  defaultValue?: string
  placeholder: string
  style?: any
  onChange: React.FormEventHandler<HTMLTextAreaElement>
  className?: string
  disabled?: boolean
  error?: any
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const {
      name,
      defaultValue,
      placeholder,
      style,
      onChange,
      className,
      error,
      disabled,
      ...rest
    } = props
    return (
      <Box
        pl={6}
        pr={6}
        className={`inputfield ${className} ${isFocused && 'isFocused'} ${
          !!error && 'error'
        }`}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
      >
        <textarea
          name={name}
          ref={ref}
          cols={40}
          rows={5}
          defaultValue={defaultValue}
          onChange={onChange}
          style={style}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
      </Box>
    )
  }
)

interface FormInputProps {
  children: ReactNode
  label: ReactNode
  newElement?: ReactNode
  required?: boolean
}
export const FormInput = ({
  children,
  label,
  newElement,
  required,
}: FormInputProps) => {
  return (
    <Box style={{ width: '100%' }}>
      <Box mb={10} flexBox alCenter jSpace>
        <Title>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </Title>
        {newElement}
      </Box>

      {children}
    </Box>
  )
}

// export const SearchField = React.forwardRef((props, ref) => {
//   const {
//     value,
//     name,
//     defaultValue,
//     placeholder,
//     style,
//     onChange,
//     className,
//     type,
//     disabled,
//     ...rest
//   } = props;
//   return (
//     <div className="searchbox">
//       <input
//         value={value}
//         name={name}
//         ref={ref}
//         defaultValue={defaultValue}
//         onChange={onChange}
//         style={style}
//         className={`searchfield ${className} ${disabled && `disabled`}`}
//         placeholder={placeholder}
//         type={type}
//         disabled={disabled}
//         {...rest}
//       />
//       <div className="icon">
//         <BiSearch size={24} />
//       </div>
//     </div>
//   );
// });
