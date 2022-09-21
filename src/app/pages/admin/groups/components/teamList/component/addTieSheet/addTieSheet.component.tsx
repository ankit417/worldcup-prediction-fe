import { useEffect } from 'react'
import { Modal } from 'react-uicomp'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useFormInput } from 'use-form-input'

import { getAllTeam, RootState } from '../../../../../../../../redux'
import { Hrline, Title } from '../../../../../../../common'

const AddTiesheet = ({ visible, onClose, groupId }: any) => {
  const dispatch = useDispatch()
  const { teamList } = useSelector((state: RootState) => state.team)
  useEffect(() => {
    dispatch(getAllTeam())
    // dispatch(getAllGame(groupId))
    setValue('teamId', groupId)
  }, [dispatch, groupId])

  const [data, { setValue, clear }] = useFormInput({
    teamId: '',
  })
  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { teamId } = data
    const requestBody = {
      teamId,
    }
    console.log('request body', requestBody)
    console.log('clear', clear)
    //[todo dispatch add team to tiesheet]
  }

  return (
    <Modal visible={visible}>
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
        <div>
          <form onSubmit={onSubmitHandler}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={teamList}
              // sx={{ width: 300 }}
              getOptionLabel={(option: any) => option.team_name}
              onChange={(_, value) => setValue('teamId', value.id)}
              renderInput={(params) => <TextField {...params} label="Team A" />}
            />
          </form>
        </div>
      </div>
    </Modal>
  )
}

export { AddTiesheet }
