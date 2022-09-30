import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllGroups, RootState } from '../../../../redux'
import { TabsComponent } from './components'
import { Title, Hrline, Card } from '../../../common'

// import { MatchComponent } from './components/match'

export const UserHome = ({}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllGroups(2))
  }, [dispatch])

  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )

  console.log('Group list', groupLoading, groupList)

  return (
    <div>
      {/* <Nav /> */}
      <div className="home-wrapper">
        <Card containerStyle={{ width: '65%', margin: 30 }}>
          <div className="home-card-title">
            <Title>Tournament</Title>
          </div>
          <Hrline gap={12} />
          <TabsComponent />
        </Card>
      </div>
    </div>
  )
}
