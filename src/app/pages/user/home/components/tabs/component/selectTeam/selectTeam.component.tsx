import { useEffect } from 'react'
// import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { useDispatch, useSelector } from 'react-redux'
import { useFormInput } from 'use-form-input'

import {
  getAllTeam,
  RootState,
  getUserTiesheet,
  addTieSheetPrediction,
  getGroupInfo,
} from '../../../../../../../../redux'
import Autocomplete from '@mui/material/Autocomplete'
import { Button, Box, Table } from '../../../../../../../common'

const SelectTeam = ({ groupId }: any) => {
  console.log('Select group group Id', groupId)
  const GROUP_ID = groupId
  const dispatch = useDispatch()
  const { teamList } = useSelector((state: RootState) => state.team)
  const { tiesheetPredictionLoading, tiesheetPredictionList } = useSelector(
    (state: RootState) => state.tiesheetPrediction
  )

  const { groupInfoList } = useSelector((state: RootState) => state.group)
  console.log('Tie sheet prediction list', tiesheetPredictionList)
  useEffect(() => {
    dispatch(getAllTeam())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUserTiesheet(groupId))
  }, [dispatch, groupId])

  useEffect(() => {
    dispatch(getGroupInfo(groupId))
  }, [dispatch, groupId])

  const [data, { setValue, clear }] = useFormInput({
    teamId: '',
    groupId: '',
  })

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { teamId, groupId } = data
    const requestBody = {
      group_id: GROUP_ID,
      predicted_team_id: teamId,
    }

    console.log('group Id ', groupId)
    dispatch(
      addTieSheetPrediction(requestBody, () => {
        dispatch(getUserTiesheet(GROUP_ID))
      })
    )
    clear()
    console.log('request body', requestBody, groupId)
    // onClose()
  }

  return (
    <div>
      <div>You can add upto {groupInfoList[0]?.number_of_team} Teams</div>
      <form onSubmit={onSubmitHandler}>
        <Box flexBox vertical columnGap={20}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={teamList}
            sx={{ width: 300 }}
            getOptionLabel={(option: any) => option.team_name}
            onChange={(_, value) => setValue('teamId', value.id)}
            renderInput={(params) => (
              <TextField {...params} label="Select Team" />
            )}
          />

          <Button title={'Submit'} type="submit" />
        </Box>
      </form>

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
        onDeleteHandler={(data: any) => {
          //   toast.error(data?.id)
          // dispatch(
          //   deleteTieSheet(data?.id, () => {
          //     dispatch(getAllTieSheet(groupId))
          //   })
          // )
          console.log('delete handler data', data)
          // deleteHandler(data?.id)
        }}
      />
    </div>
  )
}

export { SelectTeam }
