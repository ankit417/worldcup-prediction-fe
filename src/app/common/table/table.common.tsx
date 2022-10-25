// import { useNavigation } from 'react-auth-navigation'
// import { useEffect } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'
import { GrUpdate } from 'react-icons/gr'
import { FaClipboardList } from 'react-icons/fa'
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Pagination,
  styled,
} from '@mui/material'

import { ToolTip, ActivityIndicator, Button } from '..'
import {} from '../index'
// import { TABLE_LIMIT } from '../../../config'
import { ConfirmationModal } from '../confirmationModal/ConfirmationModal.common'

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
  actions?: any
  dataLoader?: any
  totalCount?: any
  deleteLoader?: any
  onDeleteHandler?: any
  onEditHandler?: any
  onViewHandler?: any
  // viewBug?: any;
  // onPageChange
}
export const Table = ({
  columns,
  data,
  actions,
  dataLoader,
  totalCount,
  deleteLoader,
  onDeleteHandler,
  onEditHandler,
  onViewHandler,
}: // onPageChange,
CommonTableProps) => {
  // const { location, navigation } = useNavigation()
  // const { navigate } = navigation
  // const [visible, setVisible] = useState(false);
  // const [activeRow, setActiveRow] = useState();
  // let query = useQuery()

  // const pageNumber = query.get('page') || 1

  // function useQuery() {
  //   return new URLSearchParams(location?.search)
  // }

  // const page = async (event: any, newPage = 1) => {
  //   event.preventDefault()
  //   navigate(location.pathname + `?page=` + Number(newPage))
  // }

  // useEffect(() => {
  //   onPageChange?.({ pageNo })
  // }, [pageNo])

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
          {data?.length ? (
            <TableBody>
              {data.map((item: any, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    {columns.map((col: any, i: number) => {
                      if (col.render) {
                        return (
                          <TableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            <div style={col.cellStyle}>
                              {col.render(item[col.field], item)}
                            </div>
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
                                    <ToolTip
                                      text={
                                        item.menu_items
                                          ? item.menu_items?.is_deleted
                                            ? 'Activate'
                                            : 'Deactivate'
                                          : 'Delete'
                                      }
                                      down
                                    >
                                      {item.menu_items ? (
                                        <GrUpdate size={18} />
                                      ) : (
                                        <MdDelete size={18} />
                                      )}
                                    </ToolTip>
                                  }
                                />
                              }
                              label={`Are you sure you want to ${
                                item.menu_items
                                  ? item.menu_items?.is_deleted
                                    ? 'activate'
                                    : 'deactivate'
                                  : 'delete'
                              } ?`}
                              onConfirmClick={(e, callback) => {
                                e.preventDefault()
                                onDeleteHandler(item, callback)
                              }}
                              confirmLabel={
                                item.menu_items
                                  ? item.menu_items?.is_deleted
                                    ? 'Activate'
                                    : 'Deactivate'
                                  : 'Delete'
                              }
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
        {!dataLoader && !data?.length ? (
          <p style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
            No Data
          </p>
        ) : null}
        {dataLoader ? <ActivityIndicator animating={true} /> : null}
      </TableContainer>

      {!dataLoader && data?.length && totalCount ? (
        <div style={{ width: '100%', display: 'flex' }}>
          {/* <Pagination
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
          /> */}
        </div>
      ) : null}
    </div>
  )
}
