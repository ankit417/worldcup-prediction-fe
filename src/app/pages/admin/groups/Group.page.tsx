import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'
// import { toast } from 'react-hot-toast'

import { GroupList, TeamList } from './components'
import {
  getAllGroups,
  addGroups,
  deleteGroup,
  RootState,
} from '../../../../redux'
import { CompWrapper, Table, Button, Card } from '../../../common'

import { AddGroupModal } from './component/AddGroup'
const Group = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0)
  const [initialGroup, setInitialGroup] = useState<number | null>(null)

  const {
    params,
    navigation: { navigate },
  }: any = useNavigation()
  const { tournamentId } = params
  const dispatch = useDispatch()
  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )
  useEffect(() => {
    dispatch(getAllGroups(tournamentId))
  }, [dispatch])

  const onSubmitHandler = (requestBody: any) => {
    dispatch(
      addGroups(
        {
          tournament_id: tournamentId,
          group_name: requestBody.name,
          match_point: requestBody.point,
          is_final: requestBody.isFinal, //todo
        },
        () => {
          dispatch(getAllGroups(tournamentId))
          setVisible(false)
        }
      )
    )
  }

  const deleteHandler = (groupId: number) => {
    dispatch(
      deleteGroup(groupId, () => {
        dispatch(getAllGroups(tournamentId))
      })
    )
  }

  const activeGroup = (group: any, index: number) => {
    setInitialGroup(group)
    setActiveGroupIndex(index)
  }

  return (
    <CompWrapper>
      <div className="group-container">
        <Card containerStyle={{ width: '30%' }}>
          <div>
            <GroupList
              onPress={activeGroup}
              activeGroupIndex={activeGroupIndex}
            />
          </div>
        </Card>
        <Card>
          <div>
            <TeamList
              selectedGroup={initialGroup}
              // activeGroupIndex={activeGroupIndex}
            />
          </div>
        </Card>
      </div>
      {/* REMOVE FROM HERE */}
      <div
        style={{
          width: 200,
          marginLeft: 10,
        }}
      >
        <Button
          title="Add Group"
          onClick={() => {
            setVisible(true)
          }}
        />
        <AddGroupModal
          visible={visible}
          setVisible={setVisible}
          onSubmit={onSubmitHandler}
        />
      </div>
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
          navigate(`view/${tournamentId}/group/${data?.id}`)
        }}
        onDeleteHandler={(data: any) => {
          //   toast.error(data?.id)
          //   console.log('delete handler data', data)
          deleteHandler(data?.id)
        }}
      />
    </CompWrapper>
  )
}

export { Group }
