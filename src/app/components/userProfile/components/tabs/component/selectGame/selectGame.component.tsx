import {
  useEffect,
  //  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import moment from 'moment'

import { getAllGame, RootState } from '../../../../../../../redux'
import { MatchComponent } from '../../../.'

// const CURRENT_DATE = moment().format('YYYY-MM-DD')
const SelectGame = ({ groupId, point }: any) => {
  const dispatch = useDispatch()
  // const [disableGame, setDisableGame] = useState(true)
  const {
    // gameLoading,
    gameList,
  } = useSelector((state: RootState) => state.game)
  // console.log('Game list ', gameList, gameLoading)

  useEffect(() => {
    dispatch(getAllGame(groupId))
  }, [dispatch, groupId])

  // useEffect(() => {
  //   if (moment(deadline).format('YYYY-MM-DD') <= CURRENT_DATE) {
  //     setDisableGame(true)
  //   } else {
  //     setDisableGame(false)
  //   }
  // }, [groupId, deadline])

  return (
    <div>
      <MatchComponent data={gameList} point={point} />
    </div>
  )
}

export { SelectGame }
