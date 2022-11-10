import { useEffect, useState } from 'react'
// import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { useFormInput } from 'use-form-input'

import {
  getAllTeam,
  RootState,
  getUserTiesheet,
  addTieSheetPrediction,
  getGroupInfo,
  deleteTieSheetPrediction,
} from '../../../../../../../../redux'
import Autocomplete from '@mui/material/Autocomplete'
import { Button, Box, Table } from '../../../../../../../common'
import toast from 'react-hot-toast'

const CURRENT_DATE = moment().format('YYYY-MM-DD')

const SelectTeam = ({ groupId, deadline }: any) => {
  const [disableGame, setDisableGame] = useState(true)
  // console.log('Select group group Id', groupId)
  const GROUP_ID = groupId
  const dispatch = useDispatch()
  const { teamList } = useSelector((state: RootState) => state.team)
  const { tiesheetPredictionLoading, tiesheetPredictionList } = useSelector(
    (state: RootState) => state.tiesheetPrediction
  )

  const { groupInfoList } = useSelector((state: RootState) => state.group)
  // console.log('Tie sheet prediction list', tiesheetPredictionList)
  useEffect(() => {
    dispatch(getAllTeam())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUserTiesheet(groupId))
  }, [dispatch, groupId])

  useEffect(() => {
    if (moment(deadline).format('YYYY-MM-DD') <= CURRENT_DATE) {
      setDisableGame(true)
    } else {
      setDisableGame(false)
    }
  }, [groupId, deadline])

  useEffect(() => {
    dispatch(getGroupInfo(groupId))
  }, [dispatch, groupId])

  const [data, { setValue, clear }] = useFormInput({
    teamId: '',
    groupId: '',
  })

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const {
      teamId,
      //  groupId
    } = data
    if (teamId !== '') {
      const requestBody = {
        group_id: GROUP_ID,
        predicted_team_id: teamId,
      }

      // console.log('group Id ', groupId)
      dispatch(
        addTieSheetPrediction(requestBody, () => {
          dispatch(getUserTiesheet(GROUP_ID))
        })
      )
      clear()
      // console.log('request body', requestBody, groupId)
      // onClose()
    } else {
      toast.error('Please select a team')
    }
  }

  return (
    <div className="user-select-team-wrapper">
      <div className="form-wrapper">
        <div className="number-of-teams">
          You can add upto {groupInfoList[0]?.number_of_team} Teams
        </div>
        <form onSubmit={onSubmitHandler}>
          <Box flexBox columnGap={20} className="team-selection-container">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={teamList}
              sx={{ width: 300 }}
              value={null}
              getOptionLabel={(option: any) => option.team_name}
              onChange={(_, value: any) => setValue('teamId', value.id)}
              renderInput={(params) => (
                <TextField {...params} label="Select Team" />
              )}
            />

            <Button title={'Submit'} type="submit" disabled={disableGame} />
          </Box>
        </form>
      </div>
      <Table
        columns={[
          {
            field: 'team_name',
            name: 'Team Name',
            render: (rowData: any) => rowData,
          },
        ]}
        data={tiesheetPredictionList}
        dataLoader={tiesheetPredictionLoading}
        totalCount={tiesheetPredictionList.length}
        actions
        disableActions={disableGame}
        onDeleteHandler={(data: any) => {
          //   toast.error(data?.id)
          dispatch(
            deleteTieSheetPrediction(data?.id, () => {
              dispatch(getUserTiesheet(GROUP_ID))
            })
          )
          // console.log('delete handler data', data)
          // deleteHandler(data?.id)
        }}
      />
    </div>
  )
}

export { SelectTeam }
