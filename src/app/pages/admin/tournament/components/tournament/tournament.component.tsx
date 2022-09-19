import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
// import { useNavigation } from 'react-auth-navigation'

import { BsPlusCircleFill } from 'react-icons/bs'
import { getAllTournaments, RootState } from '../../../../../../redux'
import { Hrline, Title } from '../../../../../common'

const TournamentList = ({ onPress }: any) => {
  // const {
  //   navigation: { navigate },
  //   // history,
  // } = useNavigation()

  const dispatch = useDispatch()
  const { tournamentLoading, tournamentList } = useSelector(
    (state: RootState) => state.tournament
  )

  useEffect(() => {
    dispatch(getAllTournaments())
  }, [dispatch])

  useEffect(() => {
    if (tournamentList.length > 0) {
      activeTournament(tournamentList[0].id)
    }
  }, [tournamentList])

  console.log(tournamentList, tournamentLoading)

  const activeTournament = (tournamentId: number) => {
    console.log('tournament id', tournamentId)
    onPress(tournamentId)
  }

  return (
    <div>
      <div>
        <div className="tournament-title-wrapper">
          <Title>Tournaments</Title>
          <BsPlusCircleFill size={24} className="add-tournament" />
        </div>
        <Hrline />
      </div>
      {tournamentList.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="tournament-item"
            onClick={() => activeTournament(item.id)}
          >
            <div>{item.tournament_name}</div>
            {tournamentList.length != index + 1 && <Hrline />}
          </div>
        )
      })}
      {tournamentLoading && <div>Loading</div>}
    </div>
  )
}

export { TournamentList }
