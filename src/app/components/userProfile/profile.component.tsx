import {
  useEffect,
  // useState
} from 'react'
import { useNavigation } from 'react-auth-navigation'

import { useDispatch, useSelector } from 'react-redux'
import {
  getAllGroups,
  RootState,
  getUserInfoAction,
  //  getAllTournaments
} from '../../../redux'
import { TabsComponent } from './components'
import { Title, Hrline, Card } from '../../common'

export const UserProfile = () => {
  const { params }: any = useNavigation()
  const { tournamentId, userId } = params
  const dispatch = useDispatch()

  useEffect(() => {
    if (userId) {
      dispatch(getUserInfoAction(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (tournamentId) {
      dispatch(getAllGroups(tournamentId))
    }
  }, [dispatch, tournamentId])

  const { userInfoLoading, userInfo } = useSelector(
    (state: RootState) => state.user
  )

  return (
    // <CompWrapper>
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      {/* <Nav /> */}
      {/* <div className="home-wrapper"> */}
      <div>
        <Card containerStyle={{ width: '100%', marginTop: 30 }}>
          <div
            className="home-card-title"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Title>
              {!userInfoLoading && userInfo && userInfo[0]?.full_name}
            </Title>
            {/* <Title>{!userInfoLoading && userInfo && userInfo[0]?.email}</Title> */}
          </div>
          <Hrline gap={12} />
          <TabsComponent selectedTournament={tournamentId} />
        </Card>
      </div>
    </div>
    // </CompWrapper>
  )
}
