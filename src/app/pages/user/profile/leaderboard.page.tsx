import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'

import moment from 'moment'
import {
  getAllGroups,
  RootState,
  getAllTournaments,
  getAllPrediction,
} from '../../../../redux'
// import { TabsComponent } from '../home/components'
import { Title, Hrline, Card, Header, Box, Table } from '../../../common'
import { TournamentList } from '../../admin/tournament/components'

// import { MatchComponent } from './components/match'

export const LeaderBoard = () => {
  const {
    // params,
    navigation: { navigate },
  }: any = useNavigation()

  const [initialTournament, setInitialTournament] = useState<
    number | null | any
  >(null)

  const [activeTournamentIndex, setActiveTournamentIndex] = useState<number>(0)

  // console.log('Initial tournament', initialTournament)
  const dispatch = useDispatch()
  const { predictionLoading, predictionList } = useSelector(
    (state: RootState) => state.prediction
  )
  useEffect(() => {
    dispatch(getAllTournaments())
  }, [dispatch])

  useEffect(() => {
    if (initialTournament) {
      dispatch(getAllGroups(initialTournament?.id))
    }
  }, [dispatch, initialTournament])

  useEffect(() => {
    if (initialTournament?.id) {
      dispatch(getAllPrediction(initialTournament?.id))
    }
  }, [initialTournament])

  // const { groupLoading, groupList } = useSelector(
  //   (state: RootState) => state.group
  // )

  const activeTournament = (tournament: any, index: number) => {
    setInitialTournament(tournament)
    setActiveTournamentIndex(index)
  }

  // console.log('Group list', groupLoading, groupList)
  // console.log('Initial tournament', initialTournament)

  return (
    // <CompWrapper>
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      {/* <Nav /> */}
      <Header />
      <div className="home-wrapper">
        {/* <div className="tournamentlist"> */}
        <Card containerClass="tournamentlist">
          <div>
            <TournamentList
              disableAdd={true}
              onPress={activeTournament}
              activeTournamentIndex={activeTournamentIndex}
            />
          </div>
        </Card>
        {/* </div> */}
        <Card containerClass="middle">
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

          <Table
            columns={[
              {
                field: 'full_name',
                name: 'Full Name',
                render: (rowData: any) => rowData,
              },
              {
                field: 'email',
                name: 'Email',
                render: (rowData: any) => rowData,
              },
              {
                field: 'finalPoint',
                name: 'Point',
                render: (rowData: any) => rowData,
              },
            ]}
            data={predictionList}
            dataLoader={predictionLoading}
            totalCount={predictionList.length}
            onViewHandler={(data: any) => {
              // console.log(data?.userId)
              navigate(
                `leaderboard-profile/${initialTournament?.id}/${data?.userId}`
              )
            }}
            actions
          />
        </Card>
        <div className="right" />
      </div>
    </div>
    // </CompWrapper>
  )
}
