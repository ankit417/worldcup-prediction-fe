import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllGame, RootState } from '../../../../../../../../redux'
import { MatchComponent } from '../../../.'

const SelectGame = ({ groupId }: any) => {
  const dispatch = useDispatch()

  const { gameLoading, gameList } = useSelector(
    (state: RootState) => state.game
  )
  console.log('Game list ', gameList, gameLoading)
  useEffect(() => {
    dispatch(getAllGame(groupId))
  }, [dispatch, groupId])

  return (
    <div>
      <MatchComponent data={gameList} />
    </div>
  )
}

export { SelectGame }
