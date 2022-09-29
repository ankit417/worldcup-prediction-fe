import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

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

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const UserHome = ({}) => {
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const TEST = [
    {
      title: 'test1',
    },
    {
      title: 'test2',
    },
    {
      title: 'test3',
    },
  ]
  return (
    <div>
      {/* <Nav /> */}
      <div className="home-wrapper">
        <Card containerStyle={{ width: '65%', margin: 30 }}>
          <div className="home-card-title">
            <Title>Group stage</Title>
          </div>
          <Hrline gap={12} />
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {TEST.map((item, index) => {
                  return <Tab label={item.title} {...a11yProps(index)} />
                })}
                {/* <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
          <MatchComponent data={DATA} />
        </Card>
      </div>
    </div>
  )
}
