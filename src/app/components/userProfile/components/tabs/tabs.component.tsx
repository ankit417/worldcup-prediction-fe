import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
// import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { getAllGroups, RootState } from '../../../../../redux'
import { TabPanel } from './component'
// interface TabPanelProps {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

const TabsComponent = ({ selectedTournament }: any) => {
  const [value, setValue] = React.useState(0)
  // const [predictionDeadline, setPredictionDeadline] = React.useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllGroups(selectedTournament))
    setValue(0)
    // setPredictionDeadline(selectedTournament?.prediction_deadline)
  }, [dispatch, selectedTournament])

  const {
    //  groupLoading,
    groupList,
  } = useSelector((state: RootState) => state.group)

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    // console.log('new value', newValue)
  }

  // console.log('Group list', groupLoading, groupList)

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          {groupList.map((item: any, index: number) => {
            return <Tab label={item.group_name} {...a11yProps(index)} />
          })}
        </Tabs>
      </Box>

      {groupList.map((_item: any, index: number) => {
        return (
          <TabPanel
            value={value}
            index={index}
            group={_item}
            // deadline={predictionDeadline}
          />
        )
      })}
    </Box>
  )
}

export { TabsComponent }
