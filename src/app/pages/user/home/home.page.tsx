// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'

import { Title, Hrline, Card } from '../../../common'

import { MatchComponent } from './components/match'

const DATA = [
  {
    id: 1,
    title: 'Argentina vs nepal',
    teamA: {
      title: 'Argentina',
      image: 'https://www.worldatlas.com/r/w768/img/flag/ar-flag.jpg',
    },
    teamB: {
      title: 'Nepal',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png',
    },
  },
  {
    id: 2,
    title: 'Argentina vs nepal',
    teamA: {
      title: 'Argentina',
      image: 'https://www.worldatlas.com/r/w768/img/flag/ar-flag.jpg',
    },
    teamB: {
      title: 'Nepal',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png',
    },
    selected: 'Nepal',
  },
  {
    id: 3,
    title: 'Argentina vs nepal',
    teamA: {
      title: 'Argentina',
      image: 'https://www.worldatlas.com/r/w768/img/flag/ar-flag.jpg',
    },
    teamB: {
      title: 'Nepal',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png',
    },
  },
  {
    id: 4,
    title: 'Argentina vs nepal',
    teamA: {
      title: 'Argentina',
      image: 'https://www.worldatlas.com/r/w768/img/flag/ar-flag.jpg',
    },
    teamB: {
      title: 'Nepal',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png',
    },
  },
]

export const UserHome = ({}) => {
  return (
    <div>
      {/* <Nav /> */}
      <div className="home-wrapper">
        <Card containerStyle={{ width: '65%', margin: 30 }}>
          <div className="home-card-title">
            <Title>Group stage</Title>
          </div>
          <Hrline gap={12} />
          <MatchComponent data={DATA} />
        </Card>
      </div>
    </div>
  )
}
