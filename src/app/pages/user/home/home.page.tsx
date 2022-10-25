import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllGroups, RootState, getAllTournaments } from '../../../../redux'
import { TabsComponent } from './components'
import { Title, Hrline, Card } from '../../../common'
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
    dispatch(getAllGroups(2))
  }, [dispatch])

  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )

  const activeTournament = (tournament: any, index: number) => {
    setInitialTournament(tournament)
    setActiveTournamentIndex(index)
  }

  console.log('Group list', groupLoading, groupList)

  return (
    <div>
      {/* <Nav /> */}
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
            <Title>{initialTournament?.tournament_name}</Title>
          </div>
          <Hrline gap={12} />
          <TabsComponent
            selectedTournament={initialTournament}
            activeTournamentIndex={activeTournamentIndex}
          />
        </Card>
      </div>
    </div>
  )
}
