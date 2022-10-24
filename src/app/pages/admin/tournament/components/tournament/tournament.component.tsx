import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
// import { useNavigation } from 'react-auth-navigation'

import { BsPlusCircleFill } from 'react-icons/bs'
import { AddTournament } from './component'
import {
  getAllTournaments,
  addTournament,
  RootState,
} from '../../../../../../redux'
import { Hrline, Title } from '../../../../../common'

const TournamentList = ({ onPress, activeTournamentIndex }: any) => {
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
      activeTournament(
        tournamentList[activeTournamentIndex],
        activeTournamentIndex
      )
    }
  }, [tournamentList])

  const activeTournament = (tournament: any, index: number) => {
    onPress(tournament, index)
  }

  const handleAddTournamentModal = () => {
    setAddTournamentModal((prev) => !prev)
  }

  const onAddTournament = (requestBody: any) => {
    dispatch(
      addTournament(requestBody, () => {
        dispatch(getAllTournaments())
        setAddTournamentModal(false)
      })
    )
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
          />
        </div>
        <Hrline />
      </div>
      <AddTournament
        visible={addTournamentVisible}
        onClose={handleAddTournamentModal}
        onSubmit={onAddTournament}
      />
      {tournamentList.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="tournament-item"
            style={{
              backgroundColor: activeTournamentIndex === index && '#CBEAA6',
            }}
            onClick={() => activeTournament(item, index)}
          >
            <div className="tournament-item-text">{item.tournament_name}</div>
            {/* {tournamentList.length != index + 1 && <Hrline />} */}
          </div>
        )
      })}
      {tournamentLoading && <div>Loading</div>}
    </div>
  )
}

export { TournamentList }
