import { useEffect } from 'react'
// import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { useDispatch, useSelector } from 'react-redux'
import { useFormInput } from 'use-form-input'

import { getAllTeam, RootState } from '../../../../../../../../redux'
import Autocomplete from '@mui/material/Autocomplete'
import { Button, Box } from '../../../../../../../common'

const SelectTeam = ({ groupId }: any) => {
  console.log('Select group group Id', groupId)
  const dispatch = useDispatch()
  const { teamList } = useSelector((state: RootState) => state.team)

  useEffect(() => {
    dispatch(getAllTeam())
  }, [dispatch])

  const [data, { setValue, clear }] = useFormInput({
    teamId: '',
    groupId: '',
  })

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { teamId, groupId } = data
    const requestBody = {
      group_id: groupId,
      team_id: teamId,
    }
    // dispatch(addTieSheet(requestBody))
    clear()
    console.log('request body', requestBody, groupId)
    // onClose()
  }

  return (
    <div>
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
    </div>
  )
}

export { SelectTeam }
