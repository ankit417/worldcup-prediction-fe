import { MatchComponent } from '../../../.'

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

const SelectGame = () => {
  return (
    <div>
      <MatchComponent data={DATA} />
    </div>
  )
}

export { SelectGame }
