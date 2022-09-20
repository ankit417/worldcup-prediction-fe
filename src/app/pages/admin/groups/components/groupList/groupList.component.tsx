import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'

import { BsPlusCircleFill } from 'react-icons/bs'

import { getAllGroups, RootState } from '../../../../../../redux'
import { Hrline, Title } from '../../../../../common'

const GroupList = ({ activeGroupIndex, onPress }: any) => {
  const {
    params,
  }: // navigation: { navigate },
  any = useNavigation()

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
    console.log(group, index)
    onPress(group, index)
  }

  return (
    <div>
      <div>
        <div className="groups-title-wrapper">
          <Title>Groups</Title>
          <BsPlusCircleFill
            size={24}
            className="add-group"
            // onClick={handleAddTournamentModal}
          />
        </div>
        <Hrline />
      </div>
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
