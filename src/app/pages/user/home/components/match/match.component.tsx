import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

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
  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={index.toString()} className="matchCard_wrapper">
            <Title>{item.teama_name}</Title>
            <div className="match_wrapper">
              <div>
                <img src={FILE_URL + item.teama_logo} alt={item.teama_logo} />
              </div>
              <div className="prediction_button_wrapper">
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={'Draw'}
                  name="radio-buttons-group"
                  //   onChange={(e) => handleChange(e, item.id)}
                >
                  <FormControlLabel
                    value={item.teama_name}
                    control={<Radio />}
                    label={item.teama_name}
                  />
                  <FormControlLabel
                    value="Draw"
                    control={<Radio />}
                    label="Draw"
                  />
                  <FormControlLabel
                    value={item.teamb_name}
                    control={<Radio />}
                    label={item.teamb_name}
                  />
                </RadioGroup>
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

export { MatchComponent }
