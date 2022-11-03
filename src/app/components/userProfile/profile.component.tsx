import {
  useEffect,
  // useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllGroups,
  RootState,
  //  getAllTournaments
} from '../../../redux'
import { TabsComponent } from './components'
import {
  //  Title,
  Hrline,
  Card,
} from '../../common'

export const UserProfile = ({ tournamentId, userId }: any) => {
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
    if (tournamentId) {
      dispatch(getAllGroups(tournamentId))
    }
  }, [dispatch, tournamentId])

  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )

  console.log('Group list', groupLoading, groupList, userId)
  // console.log('Initial tournament', initialTournament)

  return (
    // <CompWrapper>
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      {/* <Nav /> */}
      <div className="home-wrapper">
        <Card containerStyle={{ width: '90%', marginTop: 30 }}>
          {/* <div className="home-card-title">
            <Title>{initialTournament?.tournament_name}</Title>
          </div> */}
          <Hrline gap={12} />
          <TabsComponent selectedTournament={tournamentId} />
        </Card>
      </div>
    </div>
    // </CompWrapper>
  )
}
