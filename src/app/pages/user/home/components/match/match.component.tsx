import { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useDispatch, useSelector } from 'react-redux'
import {
  getUserPrediction,
  RootState,
  createUserPrediction,
} from '../../../../../../redux'
import { Hrline, Title } from '../../../../../common'
import { FILE_URL } from '../../../../../../config'

interface MatchProps {
  group_id: number
  id: number
  match_date: string
  status: number
  teamA_id: number
  teamB_id: number
  teama_logo: string
  teama_name: string
  teamb_logo: string
  teamb_name: string
}

interface MatchComponentProps {
  data: Array<MatchProps>
}
const MatchComponent = ({ data }: MatchComponentProps) => {
  console.log('Match component data', data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserPrediction())
  }, [data])

  const { userPredictionLoading, userPredictionList } = useSelector(
    (state: RootState) => state.prediction
  )

  console.log('user prediction data', userPredictionList, userPredictionLoading)

  // const updatePrediction = (prediction: number) => {
  //   console.log('This predicted', prediction)
  // }

  //GET ALL PREDICTION OF THE USER AND INSERT IF ALREADY FILLED
  // const autoFillPrediction = (id: number, radioId: number) => {
  //   const game = userPredictionList.filter((list: any) => list.game_id == id)
  //   console.log('Game ', game)
  //   if (game.length > 0) {
  //     if (game[0]?.prediction == radioId) {
  //       return true
  //     } else {
  //       return false
  //     }
  //     // return game[0]?.prediction
  //   } else {
  //     return false
  //   }
  // }

  // const predictionDefault = (item: any) => {
  //   const checkPrediction = autoFillPrediction(item?.id)
  //   console.log('check prediction', checkPrediction)
  //   if (checkPrediction) {
  //     console.log('here')
  //     switch (checkPrediction) {
  //       case 1:
  //         return item.teama_name
  //       case 2:
  //         return item.teamb_name
  //       case 3:
  //         return ''
  //       default:
  //         return ''
  //     }
  //   } else return 'null'
  // }

  const checkedValue = (id: number) => {
    console.log('Checked value', id)
    const game = userPredictionList.filter((list: any) => list.game_id == id)
    if (game.length > 0) {
      return game[0].prediction
    }
    return null
  }
  return (
    <>
      {data.map((item, index) => {
        console.log('prediction test auto fill', checkedValue(item.id))
        return (
          <div key={index.toString()} className="matchCard_wrapper">
            <Title>
              {item.teama_name} Vs. {item.teamb_name}
            </Title>
            <div className="match_wrapper">
              <div>
                <img src={FILE_URL + item.teama_logo} alt={item.teama_logo} />
              </div>
              <div className="prediction_button_wrapper">
                <RadioGroupComponent
                  {...item}
                  // item={item}
                  // value={checkedValue(item?.id)}
                />
                {/* <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  // defaultValue={'argentina'}
                  // defaultValue={predictionDefault(item)}
                  name="radio-buttons-group"
                  // onChange={(e) => handleChange(e, item.id)}
                >
                  <FormControlLabel
                    value={item.teama_name}
                    control={
                      <Radio
                      // checked={autoFillPrediction(item?.id, 1)}
                      />
                    }
                    label={item.teama_name}
                    onChange={() => updatePrediction(1)}
                  />
                  <FormControlLabel
                    value="Draw"
                    control={
                      <Radio
                      //  checked={autoFillPrediction(item?.id, 3)}
                      />
                    }
                    label="Draw"
                    onChange={() => updatePrediction(3)}
                  />
                  <FormControlLabel
                    value={item.teamb_name}
                    control={
                      <Radio
                      // checked={autoFillPrediction(item?.id, 2)}
                      />
                    }
                    label={item.teamb_name}
                    onChange={() => updatePrediction(2)}
                  />
                </RadioGroup> */}
              </div>
              <div>
                <img
                  src={FILE_URL + item.teamb_logo}
                  height={100}
                  width={100}
                  alt={item.teamb_logo}
                />
              </div>
            </div>
            <Hrline gap={10} />
          </div>
        )
      })}
    </>
  )
}

const RadioGroupComponent = (item: any) => {
  console.log('radio group item', item)
  // const [radioNumber, setValue] = useState<number>(value)
  // console.log('Value', value)
  const [radioValue, setRadioValue] = useState<any>(null)
  console.log('Valueeeeeee', radioValue)

  // useEffect(() => {
  //   if (value) {
  //     switch (value) {
  //       case 1:
  //         return setRadioValue(item.teama_name)
  //       case 2:
  //         return setRadioValue(item.teamb_name)
  //       case 3:
  //         return setRadioValue(null)
  //       default:
  //         return setRadioValue(null)
  //     }
  //   }
  // }, [value])

  const dispatch = useDispatch()

  const { userPredictionList } = useSelector(
    (state: RootState) => state.prediction
  )

  useEffect(() => {
    checkedValue(item?.id)
  }, [item])

  const checkedValue = (id: number) => {
    console.log('Checked Valueeeeeee', id)
    const game = userPredictionList.filter((list: any) => list.game_id == id)
    if (game.length > 0) {
      console.log('pred Checked Valueeeeeee', game[0].prediction)
      //  setRadioValue(game[0].prediction)
      const value = game[0].prediction
      switch (value) {
        case 1:
          return setRadioValue(item.teama_name)
        case 2:
          return setRadioValue(item.teamb_name)
        case 3:
          return setRadioValue('Draw')
        default:
          return setRadioValue(null)
      }
    }
    return setRadioValue(null)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value)
  }

  const updatePrediction = (id: number) => {
    console.log('Update prediction test', id)
    let body = {
      game_id: item?.id,
      prediction: id,
    }

    dispatch(createUserPrediction(body))
  }

  return (
    <RadioGroup
      row
      aria-labelledby="demo-radio-buttons-group-label"
      // defaultValue={'argentina'}
      // defaultValue={predictionDefault(item)}
      name="radio-buttons-group"
      value={radioValue}
      // onChange={(e) => handleChange(e, item.id)}
      onChange={handleChange}
    >
      <FormControlLabel
        value={item.teama_name}
        control={
          <Radio
          // checked={autoFillPrediction(item?.id, 1)}
          />
        }
        label={item.teama_name}
        onChange={() => updatePrediction(1)}
      />
      <FormControlLabel
        value="Draw"
        control={
          <Radio
          //  checked={autoFillPrediction(item?.id, 3)}
          />
        }
        label="Draw"
        onChange={() => updatePrediction(3)}
      />
      <FormControlLabel
        value={item.teamb_name}
        control={
          <Radio
          // checked={autoFillPrediction(item?.id, 2)}
          />
        }
        label={item.teamb_name}
        onChange={() => updatePrediction(2)}
      />
    </RadioGroup>
  )
}

export { MatchComponent }
