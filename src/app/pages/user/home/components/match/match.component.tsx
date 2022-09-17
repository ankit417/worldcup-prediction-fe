import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Hrline, Title } from '../../../../../common'

interface MatchProps {
  id: number
  title: string
  teamA: {
    title: string
    image: string
  }
  teamB: {
    title: string
    image: string
  }
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
            <Title>{item.title}</Title>
            <div className="match_wrapper">
              <div>
                <img src={item.teamA.image} alt={item.teamA.title} />
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
                    value={item.teamA.title}
                    control={<Radio />}
                    label={item.teamA.title}
                  />
                  <FormControlLabel
                    value="Draw"
                    control={<Radio />}
                    label="Draw"
                  />
                  <FormControlLabel
                    value={item.teamB.title}
                    control={<Radio />}
                    label={item.teamB.title}
                  />
                </RadioGroup>
              </div>
              <div>
                <img
                  src={item.teamB.image}
                  height={100}
                  width={100}
                  alt={item.teamB.title}
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
