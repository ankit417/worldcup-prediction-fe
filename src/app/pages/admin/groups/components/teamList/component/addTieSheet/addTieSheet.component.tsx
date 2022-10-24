import { useEffect } from 'react'
import { Modal } from 'react-uicomp'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useFormInput } from 'use-form-input'

import {
  addTieSheet,
  getAllTeam,
  RootState,
} from '../../../../../../../../redux'
import { Button, Hrline, Title, Box } from '../../../../../../../common'

const AddTiesheet = ({ visible, onClose, groupId }: any) => {
  // console.log('group id id ', groupId)
  const GROUP_ID = groupId
  const dispatch = useDispatch()
  const { teamList } = useSelector((state: RootState) => state.team)
  useEffect(() => {
    dispatch(getAllTeam())
    // setValue('groupId', groupId)
  }, [dispatch, groupId])

  useEffect(() => {
    setValue('groupId', groupId)
  }, [groupId])

  const [data, { setValue, clear }] = useFormInput({
    teamId: '',
    groupId: '',
  })
  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { teamId, groupId } = data
    const requestBody = {
      // group_id: groupId,
      group_id: GROUP_ID,
      team_id: teamId,
    }
    dispatch(addTieSheet(requestBody))
    clear()
    console.log('request body', requestBody, groupId)
    onClose()
  }

  return (
    <Modal visible={visible} style={{ width: '30%', height: '60%' }}>
      <div>
        <div className="addTournament-title-wrapper">
          <Title>Add Team</Title>
          <AiFillCloseCircle
            size={24}
            className="addTournament-close-button"
            onClick={onClose}
          />
        </div>
        <Hrline />
        <Box mt={40}>
          <form onSubmit={onSubmitHandler}>
            <Box flexBox vertical columnGap={20}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={teamList}
                // sx={{ width: 300 }}
                getOptionLabel={(option: any) => option.team_name}
                onChange={(_, value) => setValue('teamId', value.id)}
                renderInput={(params) => (
                  <TextField {...params} label="Team A" />
                )}
              />

              <Button title={'Submit'} type="submit" />
            </Box>
          </form>
        </Box>
      </div>
    </Modal>
  )
}

export { AddTiesheet }
