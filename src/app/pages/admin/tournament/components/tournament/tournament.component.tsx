import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
// import { useNavigation } from 'react-auth-navigation'

import { BsPlusCircleFill } from 'react-icons/bs'
import { AddTournament } from './component'
import { getAllTournaments, RootState } from '../../../../../../redux'
import { Hrline, Title } from '../../../../../common'

const TournamentList = ({ onPress }: any) => {
  const [addTournamentVisible, setAddTournamentModal] = useState<boolean>(false)
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

  const handleAddTournamentModal = () => {
    setAddTournamentModal((prev) => !prev)
  }

  const onAddTournament = (requestBody: any) => {
    console.log('request body', requestBody)
  }

  return (
    <div>
      <div>
        <div className="tournament-title-wrapper">
          <Title>Tournaments</Title>
          <BsPlusCircleFill
            size={24}
            className="add-tournament"
            onClick={handleAddTournamentModal}
            onSubmit={onAddTournament}
          />
        </div>
        <Hrline />
      </div>
      <AddTournament
        visible={addTournamentVisible}
        onClose={handleAddTournamentModal}
      />
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
