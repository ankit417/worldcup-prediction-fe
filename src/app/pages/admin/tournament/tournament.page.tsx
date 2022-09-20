import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useNavigation } from 'react-auth-navigation'

import { GroupList, TournamentList } from './components'
import { getAllTournaments } from '../../../../redux'
import { Card, CompWrapper } from '../../../common'

const Tournament = () => {
  const [initialTournament, setInitialTournament] = useState<number | null>(
    null
  )

  const [activeTournamentIndex, setActiveTournamentIndex] = useState<number>(0)
  // const {
  //   navigation: { navigate },
  // } = useNavigation()

  const dispatch = useDispatch()
  // const { tournamentLoading, tournamentList } = useSelector(
  //   (state: RootState) => state.tournament
  // )

  useEffect(() => {
    dispatch(getAllTournaments())
  }, [dispatch])

  const activeTournament = (tournament: any, index: number) => {
    setInitialTournament(tournament)
    setActiveTournamentIndex(index)
  }
  return (
    <CompWrapper>
      <div className="tournament-container">
        <Card containerStyle={{ width: '30%', marginRight: 20 }}>
          <div>
            <TournamentList
              onPress={activeTournament}
              activeTournamentIndex={activeTournamentIndex}
            />
          </div>
        </Card>
        <Card>
          <div>
            <GroupList
              selectedTournament={initialTournament}
              activeTournamentIndex={activeTournamentIndex}
            />
          </div>
        </Card>
      </div>
    </CompWrapper>
  )
}

export { Tournament }
