import Select from 'react-select'

import { colors } from '../../../modules'

interface SelectFieldProps {
  data?: any
  isViewing?: boolean
  getOptionLabel?: any
  getOptionValue?: any
  options: any[]
  formatGroupLabel?: any
  onChangeValue?: (arg: any) => void
  isSearchable?: boolean
  isClearable?: boolean
  placeholder?: string
  isLoading?: any
  defaultValue?: any
  isMulti?: any
  value?: any
  isOptionDisabled?: any
  formatOptionLabel?: any
  instanceId?: any
  borderless?: boolean
  isDisabled?: boolean
  onFocus?: any
}

export const SelectField = ({
  options,
  formatGroupLabel,
  onChangeValue,
  getOptionLabel = 'label',
  getOptionValue = 'id',
  isSearchable,
  isClearable,
  placeholder,
  isLoading,
  defaultValue,
  isMulti,
  value,
  isOptionDisabled,
  formatOptionLabel,
  instanceId = 'react-select',
  borderless,
  isDisabled,
  onFocus,
  ...props
}: SelectFieldProps) => {
  const selectStyles = {
    valueContainer: (provided: any) => ({
      ...provided,
      height: 'auto',
      flexWrap: 'wrap',
    }),
    control: (styles: any, { isFocused }: { isFocused: boolean }) => ({
      ...styles,
      borderRadius: 4,
      borderColor: borderless
        ? 'transparent'
        : isFocused
        ? colors.light.primary100
        : colors.light.grey200,
      backgroundColor: '#F8F8F8',
      boxShadow: isFocused && 'none',
      '&:hover': {
        borderColor: borderless ? 'transparent' : colors.light.primary100,
      },
    }),
    option: (styles: any, { isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isSelected ? colors.light.primary200 : '#fff',
        '&:hover': {
          backgroundColor: isSelected
            ? colors.light.primary200
            : colors.light.grey400,
        },
      }
    },
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: 'none',
    }),
  }

  let optionLabel
  if (typeof getOptionLabel === 'string') {
    optionLabel = (option: any) => `${option[getOptionLabel]}`
  } else if (typeof getOptionLabel === 'function') {
    optionLabel = getOptionLabel
  }

  let optionValue
  if (typeof getOptionValue === 'string') {
    optionValue = (option: any) => `${option[getOptionValue]}`
  } else if (typeof getOptionValue === 'function') {
    optionValue = getOptionValue
  }

  return (
    <div>
      <Select
        formatOptionLabel={formatOptionLabel}
        isOptionDisabled={isOptionDisabled}
        isMulti={isMulti}
        instanceId={instanceId}
        className="selectfield"
        classNamePrefix="react-select"
        styles={selectStyles}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isLoading={isLoading}
        onChange={onChangeValue}
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
        options={options}
        formatGroupLabel={formatGroupLabel}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onFocus={onFocus}
        {...props}
      />
    </div>
  )
}
