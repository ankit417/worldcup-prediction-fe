import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { getAllGroups, RootState, getAllTournaments } from '../../../../redux'
import { TabsComponent } from './components'
import { Title, Hrline, Card, Header, Box } from '../../../common'
import { TournamentList } from '../../admin/tournament/components'

// import { MatchComponent } from './components/match'

export const UserHome = ({}) => {
  const [initialTournament, setInitialTournament] = useState<
    number | null | any
  >(null)

  const [activeTournamentIndex, setActiveTournamentIndex] = useState<number>(0)

  console.log('Initial tournament', initialTournament)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTournaments())
  }, [dispatch])

  useEffect(() => {
    if (initialTournament) {
      dispatch(getAllGroups(initialTournament?.id))
    }
  }, [dispatch, initialTournament])

  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )

  const activeTournament = (tournament: any, index: number) => {
    setInitialTournament(tournament)
    setActiveTournamentIndex(index)
  }

  console.log('Group list', groupLoading, groupList)
  console.log('Initial tournament', initialTournament)

  return (
    // <CompWrapper>
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      {/* <Nav /> */}
      <Header />
      <div className="home-wrapper">
        <Card
          containerStyle={{
            width: '20%',
            marginTop: 30,
            height: 500,
            marginRight: 30,
          }}
        >
          {/* <div>List of current tournaments</div> */}
          <div>
            <TournamentList
              disableAdd={true}
              onPress={activeTournament}
              activeTournamentIndex={activeTournamentIndex}
            />
          </div>
        </Card>
        <Card containerStyle={{ width: '60%', marginTop: 30 }}>
          <div className="home-card-title">
            <Title>{initialTournament?.tournament_name?.toUpperCase()}</Title>
            <Box style={{ cursor: 'pointer' }}>
              <Title>
                {initialTournament?.show_leaderboard == 1 && 'View Leaderboard'}
              </Title>
            </Box>
            <Title>
              Prediction Deadline :{' '}
              {moment(initialTournament?.prediction_deadline).format(
                'YYYY-MM-DD'
              )}
            </Title>
          </div>
          <Hrline gap={12} />
          <TabsComponent
            selectedTournament={initialTournament}
            activeTournamentIndex={activeTournamentIndex}
          />
        </Card>
      </div>
    </div>
    // </CompWrapper>
  )
}
