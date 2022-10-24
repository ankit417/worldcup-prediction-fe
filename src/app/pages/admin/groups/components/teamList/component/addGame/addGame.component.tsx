import { useEffect } from 'react'
import { Modal } from 'react-uicomp'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useFormInput } from 'use-form-input'

import {
  getAllTeam,
  getAllGame,
  RootState,
  addGame,
} from '../../../../../../../../redux'
import {
  Hrline,
  Title,
  FormInput,
  Box,
  Button,
} from '../../../../../../../common'
import toast from 'react-hot-toast'

const AddGame = ({ visible, onClose, groupId }: any) => {
  //console.log('group id', groupId)
  const GROUP_ID = groupId
  const dispatch = useDispatch()

  const { teamList } = useSelector((state: RootState) => state.team)

  //console.log(teamLoading)
  useEffect(() => {
    dispatch(getAllTeam())
    // dispatch(getAllGame(groupId))
    // setValue('group_id', groupId)
  }, [dispatch, groupId])

  const [data, { setValue, clear }] = useFormInput({
    // group_id: '',
    teamA_id: '',
    teamB_id: '',
    match_date: '2022-12-11',
    status: 3,
  })
  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const {
      teamA_id,
      teamB_id,
      match_date,
      status,
      //  group_id
    } = data
    const requestBody = {
      group_id: GROUP_ID,
      teamA_id,
      teamB_id,
      match_date,
      status,
    }
    if (teamA_id !== teamB_id) {
      dispatch(
        addGame(requestBody, () => {
          dispatch(getAllGame(groupId))
          onClose()
          clear()
        })
      )
    } else {
      toast.error('Please select different Teams')
    }
  }

  return (
    <Modal visible={visible} style={{ height: '60%' }}>
      <div style={{ height: '70%' }}>
        <div className="addTournament-title-wrapper">
          <Title>Add Game</Title>
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
              <FormInput label="Team A" required>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={teamList}
                  // sx={{ width: 300 }}
                  getOptionLabel={(option: any) => option.team_name}
                  onChange={(_, value) => setValue('teamA_id', value.id)}
                  renderInput={(params) => (
                    <TextField {...params} label="Team A" />
                  )}
                />
              </FormInput>
              <FormInput label="Team B" required>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={teamList}
                  // sx={{ width: 300 }}
                  getOptionLabel={(option: any) => option.team_name}
                  onChange={(_, value) => setValue('teamB_id', value.id)}
                  renderInput={(params) => (
                    <TextField {...params} label="Team B" />
                  )}
                />
              </FormInput>
              <Button title="Submit" type="submit" />
            </Box>
          </form>
        </Box>
      </div>
    </Modal>
  )
}
export { AddGame }
