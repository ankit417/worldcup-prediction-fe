import { useNavigation } from 'react-auth-navigation'

import { MdEdit, MdDelete, MdOutlinePlaylistAdd } from 'react-icons/md'
import { FiCheckCircle } from 'react-icons/fi'
import { FaClipboardList, FaMinusSquare, FaPlusSquare } from 'react-icons/fa'
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  styled,
} from '@mui/material'

import {
  ToolTip,
  ActivityIndicator,
  Button,
  ConfirmationModal,
  InputField,
} from '../../common'
import { TABLE_LIMIT } from '../../../config'
import { capitalizeFirstLetter } from '../../../utils'
import { ChangeEvent, useEffect, useState } from 'react'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}))

interface CommonTableProps {
  columns?: any
  data?: any
  setData?: any
  actions?: any
  noAddRemove?: any
  dataLoader?: any
  totalCount?: any
  deleteLoader?: any
  onDeleteHandler?: any
  onEditHandler?: any
  onViewHandler?: any
  onAddHandler?: any
  onRemoveHandler?: any
  onItemUpdateHandler?: any
  onItemCreateHandler?: any
  // viewBug?: any;
}

// const inputFullStyle = {
//   background: 'transparent',
//   fontWeight: 300,
//   color: 'black',
//   fontSize: 14,
//   fontFamily: 'AvertaLight, "Montserrat", "Raleway", "Tahoma"',
//   padding: 4,
// }

export const EditTable = ({
  columns,
  data: newData,
  setData: setNewData,
  actions,
  dataLoader,
  noAddRemove,
  totalCount,
  deleteLoader,
  onDeleteHandler,
  onEditHandler,
  onViewHandler,
  onAddHandler,
  onRemoveHandler,
  onItemUpdateHandler,
  onItemCreateHandler,
}: CommonTableProps) => {
  const { location, navigation } = useNavigation()
  const { navigate } = navigation
  // const [visible, setVisible] = useState(false);
  // const [activeRow, setActiveRow] = useState();
  let query = useQuery()

  const pageNumber = query.get('page') || 1

  function useQuery() {
    return new URLSearchParams(location?.search)
  }

  const page = async (event: any, newPage = 1) => {
    event.preventDefault()
    navigate(location.pathname + `?page=` + Number(newPage))
  }

  return (
    <div className="custom-table">
      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        style={{ border: '1px solid #f1f1f1', paddingBottom: 8 }}
      >
        <MaterialTable aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((item: any, i: number) => {
                if (item.name) {
                  return (
                    <TableCell key={i} align={`${i === 0 ? 'left' : 'center'}`}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell key={i} align={`${i === 0 ? 'left' : 'center'}`}>
                      {item.field.charAt(0).toUpperCase() + item.field.slice(1)}
                    </TableCell>
                  )
                }
              })}
              {actions ? <TableCell align="center">Actions</TableCell> : null}
            </TableRow>
          </TableHead>
          {newData?.length ? (
            <TableBody>
              {newData?.map((item: any, index: number) => {
                //console.log('item in newData: ', item)
                return (
                  <StyledTableRow key={index}>
                    {columns.map((col: any, i: number) => {
                      if (col.render) {
                        return (
                          <TableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            {col.type === 'component' ? (
                              col.render(item[col.field], item)
                            ) : (
                              <div style={col.cellStyle}>
                                <CustomInputField
                                  col={col}
                                  defaultValue={item[col.field]}
                                  setNewData={setNewData}
                                  item={item}
                                />
                              </div>
                            )}
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            <p style={col.cellStyle}>{item[col.field]}</p>
                          </TableCell>
                        )
                      }
                    })}
                    {actions ? (
                      <TableCell align="center" width={50}>
                        <div style={{ display: 'flex' }}>
                          {!noAddRemove &&
                            (index === newData?.length - 1 ? (
                              <Button.Icon
                                icon={
                                  <ToolTip text="Add" down>
                                    <FaPlusSquare
                                      size={20}
                                      style={{
                                        borderRadius: 6,
                                      }}
                                    />
                                  </ToolTip>
                                }
                                onClick={(e: any) => {
                                  e.preventDefault()
                                  setNewData((prev: any) => [
                                    ...prev,
                                    {
                                      menuItemId: prev.length + 1,
                                      name: '',
                                      description: '',
                                      price: 0,
                                    },
                                  ])
                                  onAddHandler && onAddHandler(item)
                                }}
                              />
                            ) : (
                              <Button.Icon
                                icon={
                                  <ToolTip text="Remove" down>
                                    <FaMinusSquare
                                      size={20}
                                      color="red"
                                      style={{
                                        borderRadius: 6,
                                      }}
                                    />
                                  </ToolTip>
                                }
                                onClick={(e: any) => {
                                  e.preventDefault()
                                  setNewData((prev: any) =>
                                    prev.filter(
                                      (prevItem: any) =>
                                        prevItem.menuItemId !== item.menuItemId
                                    )
                                  )
                                  onRemoveHandler && onRemoveHandler(item)
                                }}
                              />
                            ))}

                          {item.id
                            ? onItemUpdateHandler && (
                                <Button.Icon
                                  icon={
                                    <ToolTip text="Update" down>
                                      <FiCheckCircle size={18} />
                                    </ToolTip>
                                  }
                                  onClick={() => {
                                    //console.log('item for update: ', item)
                                    return onItemUpdateHandler(item)
                                  }}
                                />
                              )
                            : onItemCreateHandler && (
                                <Button.Icon
                                  icon={
                                    <ToolTip text="Create" down>
                                      <MdOutlinePlaylistAdd
                                        size={18}
                                        color="green"
                                      />
                                    </ToolTip>
                                  }
                                  onClick={() => {
                                    return onItemCreateHandler(item)
                                  }}
                                />
                              )}
                          {onViewHandler && (
                            <Button.Icon
                              icon={
                                <ToolTip text="View" down>
                                  <FaClipboardList size={18} />
                                </ToolTip>
                              }
                              onClick={() => {
                                return onViewHandler(item)
                              }}
                            />
                          )}
                          {onEditHandler && (
                            <Button.Icon
                              style={{ marginLeft: 10, marginRight: 10 }}
                              icon={
                                <ToolTip text="Edit" down>
                                  <MdEdit size={20} />
                                </ToolTip>
                              }
                              onClick={() => {
                                onEditHandler(item)
                              }}
                            />
                          )}
                          {onDeleteHandler && (
                            <ConfirmationModal
                              displayElement={
                                <Button.Icon
                                  icon={
                                    <ToolTip text="Delete" down>
                                      <MdDelete size={18} />
                                    </ToolTip>
                                  }
                                />
                              }
                              label="Are you sure you want to delete ?"
                              onConfirmClick={(callback) => {
                                onDeleteHandler(item, callback)
                              }}
                              confirmLabel="Delete"
                              danger
                              loading={deleteLoader}
                            />
                          )}
                        </div>
                      </TableCell>
                    ) : null}
                  </StyledTableRow>
                )
              })}
            </TableBody>
          ) : null}
        </MaterialTable>
        {!dataLoader && !newData?.length ? (
          <div
            style={{
              textAlign: 'center',
              paddingTop: 20,
              paddingBottom: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>No Data </div>
            {!noAddRemove && (
              <Button.Icon
                icon={
                  <ToolTip text="Add" down>
                    <FaPlusSquare
                      size={20}
                      style={{
                        borderRadius: 6,
                      }}
                    />
                  </ToolTip>
                }
                onClick={(e: any) => {
                  e.preventDefault()
                  setNewData((prev: any) => [
                    ...prev,
                    {
                      menuItemId: prev?.length + 1,
                      name: '',
                      description: '',
                      price: 0,
                    },
                  ])
                }}
              />
            )}
          </div>
        ) : null}
        {dataLoader ? <ActivityIndicator animating={true} /> : null}
      </TableContainer>

      {!dataLoader && newData?.length && totalCount ? (
        <div style={{ width: '100%', display: 'flex' }}>
          <Pagination
            style={{
              marginLeft: 'auto',
              marginTop: 20,
              display: 'inline-block',
            }}
            count={Math.ceil(totalCount / TABLE_LIMIT)}
            boundaryCount={1}
            page={Number(pageNumber)}
            variant="outlined"
            shape="rounded"
            onChange={page}
          />
        </div>
      ) : null}
    </div>
  )
}

// MARK: Custom input field for every menu items' property
const CustomInputField = ({ col, item, setNewData, defaultValue }: any) => {
  const [value, setValue] = useState<any>(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const inputFullStyle = {
    background: 'transparent',
    fontWeight: 300,
    color: 'black',
    fontSize: 14,
    fontFamily: 'AvertaLight, "Montserrat", "Raleway", "Tahoma"',
    padding: 4,
  }
  return (
    <InputField
      key={item.id}
      boxStyle={{
        fontWeight: 300,
        color: 'black',
        paddingLeft: 10,
      }}
      style={{ ...inputFullStyle }}
      lefticon={col.name === 'Price' && 'Rs. '}
      type={col.type}
      name={col.name}
      placeholder={capitalizeFirstLetter(col.name)}
      // defaultValue={defaultValue}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setValue(e.target.value)
        setNewData((prev: any) => {
          return prev.map((obj: any) => {
            //console.log('obj and item: ', obj, item)
            if (obj.menuItemId) {
              if (obj.menuItemId === item.menuItemId) {
                return {
                  ...obj,
                  [col.field]: e.target.value,
                }
              }
            } else if (obj.id) {
              if (obj.id === item.id) {
                return {
                  ...obj,
                  [col.field]: e.target.value,
                }
              }
            }
            return obj
          })
        })
      }}
    />
  )
}
