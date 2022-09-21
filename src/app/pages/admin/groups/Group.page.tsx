import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'
// import { toast } from 'react-hot-toast'

import { GroupList, TeamList } from './components'
import { getAllGroups } from '../../../../redux'
import { CompWrapper, Card } from '../../../common'

const Group = () => {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0)
  const [initialGroup, setInitialGroup] = useState<number | null>(null)

  const { params }: any = useNavigation()
  const { tournamentId } = params
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllGroups(tournamentId))
  }, [dispatch])

  const activeGroup = (group: any, index: number) => {
    setInitialGroup(group)
    setActiveGroupIndex(index)
  }

  console.log('Initial group', initialGroup)
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
    </CompWrapper>
  )
}

export { Group }
