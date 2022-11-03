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
  // const [initialTournament, setInitialTournament] = useState<
  //   number | null | any
  // >(null)

  // const [activeTournamentIndex, setActiveTournamentIndex] = useState<number>(0)

  // console.log('Initial tournament', initialTournament)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getAllTournaments())
  // }, [dispatch])

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

  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )
  const { userInfoLoading, userInfo } = useSelector(
    (state: RootState) => state.user
  )

  console.log('Group list', groupLoading, groupList, userId)
  console.log('user info', userInfoLoading, userInfo)
  // console.log('Initial tournament', initialTournament)

  return (
    // <CompWrapper>
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      {/* <Nav /> */}
      <div className="home-wrapper">
        <Card containerStyle={{ width: '90%', marginTop: 30 }}>
          <div className="home-card-title">
            <Title>
              {!userInfoLoading && userInfo && userInfo[0]?.full_name}
            </Title>
            <Title>{!userInfoLoading && userInfo && userInfo[0]?.email}</Title>
          </div>
          <Hrline gap={12} />
          <TabsComponent selectedTournament={tournamentId} />
        </Card>
      </div>
    </div>
    // </CompWrapper>
  )
}
