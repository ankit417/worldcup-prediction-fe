import { useNavigation } from 'react-auth-navigation'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
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

import { ToolTip, ActivityIndicator, Button } from '..'
import {} from '../index'
import { TABLE_LIMIT } from '../../../config'
import { ConfirmationModal } from '../confirmationModal/ConfirmationModal.common'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BiReset } from 'react-icons/bi'
// import { NotificationModal } from "../../components";

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
  onUpdateHandler?: any
  disableActions?: boolean
  onResetHandler?: any
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
  onUpdateHandler,
  onResetHandler,
  disableActions,
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
          {data?.length ? (
            <TableBody>
              {data.map((item: any, index: number) => {
                // console.log('item', item)
                return (
                  <StyledTableRow key={index}>
                    {columns.map((col: any, i: number) => {
                      if (col.render) {
                        return (
                          <TableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            <p>{col.render(item[col.field], item.id)}</p>
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            <p>{item[col.field]}</p>
                          </TableCell>
                        )
                      }
                    })}
                    {actions ? (
                      <TableCell align="center" width={50}>
                        <div style={{ display: 'flex' }}>
                          {onUpdateHandler && (
                            <ConfirmationModal
                              displayElement={
                                <Button.Icon
                                  icon={
                                    <ToolTip text="Top Product" down>
                                      {item?.product_details?.is_top ? (
                                        <AiFillStar size={20} color="orange" />
                                      ) : (
                                        <AiOutlineStar
                                          size={20}
                                          color="orange"
                                        />
                                      )}
                                    </ToolTip>
                                  }
                                />
                              }
                              label="Are you sure you Update the product ?"
                              onConfirmClick={(callback) => {
                                onUpdateHandler(item, callback)
                              }}
                              confirmLabel="Update"
                              loading={deleteLoader}
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
                              disabled={disableActions}
                              icon={
                                <ToolTip text="Edit" down>
                                  <MdEdit size={20} color="blue" />
                                </ToolTip>
                              }
                              onClick={() => {
                                onEditHandler(item)
                              }}
                            />
                          )}

                          {onResetHandler && (
                            <Button.Icon
                              style={{ marginLeft: 10, marginRight: 10 }}
                              disabled={disableActions}
                              icon={
                                <ToolTip text="Reset Password" down>
                                  <BiReset size={20} />
                                </ToolTip>
                              }
                              onClick={() => {
                                onResetHandler(item)
                              }}
                            />
                          )}

                          {onDeleteHandler && (
                            <ConfirmationModal
                              displayElement={
                                <Button.Icon
                                  disabled={disableActions}
                                  icon={
                                    <ToolTip text="Delete" down>
                                      <MdDelete size={18} color="red" />
                                    </ToolTip>
                                  }
                                />
                              }
                              label={
                                disableActions
                                  ? `Cannot Add or Delete game after deadline`
                                  : `Are you sure you want to ${
                                      item.menu_items
                                        ? item.menu_items?.is_deleted
                                          ? 'activate'
                                          : 'deactivate'
                                        : 'delete'
                                    } ?`
                              }
                              onConfirmClick={(e, callback) => {
                                if (!disableActions) {
                                  e.preventDefault()
                                  onDeleteHandler(item, callback)
                                }
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
