import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'

import {
  getAllGroups,
  // addGroups,
  // deleteGroup,
  RootState,
} from '../../../../../../redux'
import { Table } from '../../../../../common'

const GroupList = ({ selectedTournament }: any) => {
  const {
    // params,
    navigation: { navigate },
  }: any = useNavigation()
  // const { tournamentId } = params
  const dispatch = useDispatch()
  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )
  useEffect(() => {
    dispatch(getAllGroups(selectedTournament))
  }, [dispatch, selectedTournament])

  return (
    <div>
      {selectedTournament}
      <div>
        <Table
          columns={[
            {
              field: 'group_name',
              name: 'Name',
              render: (rowData: any) => rowData,
            },
            {
              field: 'match_point',
              name: 'Point per Game',
              render: (rowData: any) => rowData,
            },
            {
              field: 'is_final',
              name: 'Final',
              render: (rowData: any) => rowData,
            },
          ]}
          data={groupList}
          dataLoader={groupLoading}
          totalCount={groupList.length}
          actions
          onEditHandler={(data: any) => {
            console.log('data', data)
            //   setVisible(true)
            // if (data?.orders?.is_paid) {
            // } else navigate(`/order/${data?.orders?.id}/edit`)
          }}
          onViewHandler={(data: any) => {
            //   console.log(data)
            navigate(`view/${selectedTournament}/group/${data?.id}`)
          }}
          onDeleteHandler={(data: any) => {
            //   toast.error(data?.id)
            console.log('delete handler data', data)
            // deleteHandler(data?.id)
          }}
        />
      </div>
    </div>
  )
}

export { GroupList }
