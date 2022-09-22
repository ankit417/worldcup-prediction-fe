import { useEffect } from 'react'
import { Modal } from 'react-uicomp'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useFormInput } from 'use-form-input'

import { getAllTeam, RootState } from '../../../../../../../../redux'
import { Button, Hrline, Title, Box } from '../../../../../../../common'

const AddTiesheet = ({ visible, onClose, groupId }: any) => {
  const dispatch = useDispatch()
  const { teamList } = useSelector((state: RootState) => state.team)
  useEffect(() => {
    dispatch(getAllTeam())
    // dispatch(getAllGame(groupId))
    setValue('groupId', groupId)
  }, [dispatch, groupId])

  const [data, { setValue, clear }] = useFormInput({
    teamId: '',
    groupId: '',
  })
  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { teamId, groupId } = data
    const requestBody = {
      teamId,
      groupId,
    }
    console.log('request body', requestBody, groupId)
    console.log('clear', clear)
    //[todo dispatch add team to tiesheet]
  }

  return (
    <Modal visible={visible}>
      <div style={{ marginBottom: 50 }}>
        <div className="addTournament-title-wrapper">
          <Title>Add Team</Title>
          <AiFillCloseCircle
            size={24}
            className="addTournament-close-button"
            onClick={onClose}
          />
        </div>
        <Hrline />
        <div>
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
        </div>
      </div>
    </Modal>
  )
}

export { AddTiesheet }
