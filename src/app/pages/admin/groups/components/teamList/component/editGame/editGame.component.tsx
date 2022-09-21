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
  // addGame,
  updateGame,
} from '../../../../../../../../redux'
import {
  Hrline,
  Title,
  FormInput,
  Box,
  Button,
} from '../../../../../../../common'
import toast from 'react-hot-toast'

const EditGame = ({ visible, onClose, groupId, gameData }: any) => {
  //console.log('group id', groupId)
  //console.log('game data', gameData)
  const dispatch = useDispatch()

  const { teamList } = useSelector((state: RootState) => state.team)

  //console.log(teamLoading)
  useEffect(() => {
    dispatch(getAllTeam())
    // dispatch(getAllGame(groupId))
    setValue('group_id', groupId)
    setValue('teamA_id', gameData?.teamA_id)
    setValue('teamB_id', gameData?.teamB_id)
    setValue('match_date', gameData?.match_date)
    setValue('status', gameData?.status)
  }, [dispatch, groupId])

  const [data, { setValue, clear }] = useFormInput({
    group_id: '',
    teamA_id: '',
    teamB_id: '',
    match_date: '2022-12-11',
    status: 3,
  })
  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { teamA_id, teamB_id, match_date, status, group_id } = data
    const requestBody = {
      group_id,
      teamA_id,
      teamB_id,
      match_date,
      status,
    }
    //console.log('Request body , game id', requestBody, gameData.id)
    if (teamA_id !== teamB_id) {
      dispatch(
        updateGame(gameData.id, requestBody, () => {
          dispatch(getAllGame(groupId))
          onClose()
          clear()
        })
      )
    } else {
      toast.error('Please select different Teams')
    }
  }

  // //console.log('teamlist', teamList)
  if (!gameData) {
    return null
  }
  return (
    <Modal visible={visible}>
      <div style={{ height: '70%' }}>
        <div className="addTournament-title-wrapper">
          <Title>Edit Game</Title>
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
              <FormInput label="Team A" required>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={teamList}
                  value={
                    teamList[
                      teamList.findIndex((object: any) => {
                        return object.id == gameData.teamA_id
                      })
                    ]
                  }
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
                  value={
                    teamList[
                      teamList.findIndex((object: any) => {
                        return object.id == gameData.teamB_id
                      })
                    ]
                  }
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
        </div>
      </div>
    </Modal>
  )
}
export { EditGame }
