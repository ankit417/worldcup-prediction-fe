import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'

import { BsPlusCircleFill } from 'react-icons/bs'

import { AddGroup } from './component'

import { getAllGroups, addGroups, RootState } from '../../../../../../redux'
import { Hrline, Title } from '../../../../../common'

const GroupList = ({ activeGroupIndex, onPress }: any) => {
  const [addGroupVisible, setAddGroupVisible] = useState<boolean>(false)
  const { params }: any = useNavigation()

  const { tournamentId } = params
  const dispatch = useDispatch()
  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )
  useEffect(() => {
    dispatch(getAllGroups(tournamentId))
  }, [dispatch])

  useEffect(() => {
    if (groupList.length > 0) {
      activeGroup(groupList[activeGroupIndex], activeGroupIndex)
    }
  }, [groupList])

  const activeGroup = (group: any, index: number) => {
    //console.log(group, index)
    onPress(group, index)
  }

  const handleAddGroupModal = () => {
    setAddGroupVisible((prev) => !prev)
  }

  const onAddGroup = (requestBody: any) => {
    //console.log(requestBody)
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
          handleAddGroupModal()
        }
      )
    )
  }

  return (
    <div>
      <div>
        <div className="groups-title-wrapper">
          <Title>Groups</Title>
          <BsPlusCircleFill
            size={24}
            className="add-group"
            onClick={handleAddGroupModal}
          />
        </div>
        <Hrline />
      </div>
      <AddGroup
        visible={addGroupVisible}
        onClose={handleAddGroupModal}
        onSubmit={onAddGroup}
      />

      {groupList.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="tournament-item"
            onClick={() => activeGroup(item, index)}
          >
            <div>{item.group_name}</div>
            {groupList.length != index + 1 && <Hrline />}
          </div>
        )
      })}
      {groupLoading && <div>Loading</div>}
    </div>
  )
}
export { GroupList }
