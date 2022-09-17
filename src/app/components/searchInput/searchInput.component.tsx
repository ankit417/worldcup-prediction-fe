import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useDebounceValue } from '../../../hooks'
import { InputField } from '../../common'

export const SearchInput = ({
  title,
  append,
  onChangeHandler,
  onFocusHandler,
}: {
  title?: string
  append?: ReactNode
  onChangeHandler?: (arg?: any) => void
  onFocusHandler?: (arg?: any) => void
}) => {
  const [searchInput, setSearchInput] = useState('')

  const searchValue = useDebounceValue(searchInput)

  useEffect(() => {
    onChangeHandler(searchValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        height: 44,
      }}
    >
      <InputField
        lefticon={<MdSearch style={{ margin: '0 10px' }} />}
        name="Search"
        placeholder={`Search ${title ?? `item`}`}
        type="text"
        value={searchInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchInput(e.target.value)
        }}
        onFocusHandler={onFocusHandler}
      />
      {append}
    </div>
  )
}
