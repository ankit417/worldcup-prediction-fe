import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllTieSheet,
  deleteTieSheet,
  RootState,
} from '../../../../../../../../redux'
import { Table } from '../../../../../../../common'

const TieSheetTable = ({ groupId }: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTieSheet(groupId))
  }, [dispatch, groupId])

  const { tiesheetList, tiesheetLoading } = useSelector(
    (state: RootState) => state.tiesheet
  )

  console.log('group id', groupId, tiesheetList)
  return (
    <div>
      <Table
        columns={[
          {
            field: 'team_name',
            name: 'Team Name',
            render: (rowData: any) => rowData,
          },
        ]}
        data={tiesheetList}
        dataLoader={tiesheetLoading}
        totalCount={tiesheetList.length}
        actions
        onDeleteHandler={(data: any) => {
          //   toast.error(data?.id)
          dispatch(
            deleteTieSheet(data?.id, () => {
              dispatch(getAllTieSheet(groupId))
            })
          )
          console.log('delete handler data', data)
          // deleteHandler(data?.id)
        }}
      />
    </div>
  )
}

export { TieSheetTable }
