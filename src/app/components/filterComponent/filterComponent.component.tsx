import { Box, SelectField } from '../../common'

type option = {
  id: number
  name: string
  value: string
}

type options = option[]

export const FilterComponent = ({
  options,
  onFilterHandler,
  defaultValue,
}: {
  options?: options
  onFilterHandler: (arg?: any) => void
  defaultValue?: string
}) => {
  const filterOptions = [
    { id: 0, name: 'All', value: undefined },
    { id: 1, name: 'Active', value: 'active' },
    { id: 2, name: 'Inactive', value: 'inactive' },
  ]
  return (
    <Box flexBox row alCenter>
      <SelectField
        defaultValue={
          options
            ? options.filter((item) => item.value === defaultValue)
            : filterOptions.filter((item) => item.value === defaultValue)
        }
        options={options ?? filterOptions}
        placeholder={'Filter...'}
        getOptionLabel={(option: option) => option.name}
        getOptionValue={(option: option) => option.value}
        onChangeValue={(item) => {
          onFilterHandler(item.value)
        }}
      />
    </Box>
  )
}
