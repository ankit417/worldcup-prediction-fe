import { useEffect } from 'react'
// import moment from 'moment'
import { Modal } from 'react-uicomp'
import { useFormInput } from 'use-form-input'
import { AiFillCloseCircle } from 'react-icons/ai'
import {
  Box,
  Button,
  FormInput,
  Hrline,
  InputField,
  Title,
} from '../../../../../../../common'

const EditGroup = ({ visible, onClose, onSubmit, groupData }: any) => {
  console.log('Group data', groupData)
  const [data, { onChange, setValue, clear }] = useFormInput({
    // tournament_id: '',
    group_name: '',
    is_final: '',
    user_select: 0,
    match_point: '',
    number_of_team: '',
  })

  //   //console.log('tournament data', tournamentData)
  useEffect(() => {
    // setValue('tournament_id', groupData?.tournament_id ?? '')
    setValue('group_name', groupData?.group_name ?? '')
    setValue('is_final', groupData?.is_final ?? '')
    setValue('match_point', groupData?.match_point ?? '')
    setValue('number_of_team', groupData?.number_of_team ?? '')
    setValue('user_select', groupData?.user_select ?? 0)
  }, [groupData])

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { group_name, match_point, number_of_team, is_final, user_select } =
      data
    const requestBody = {
      group_name,
      match_point,
      is_final,
      number_of_team: parseInt(number_of_team),
      user_select,
    }
    onSubmit(requestBody)
    clear()
  }

  return (
    <Modal visible={visible}>
      <div>
        <div className="addTournament-title-wrapper">
          <Title>Edit Tournament</Title>
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
              <FormInput label="Group Name" required>
                <InputField
                  placeholder="Tournament Name"
                  name="group_name"
                  value={data.group_name}
                  onChange={onChange}
                  type="text"
                  required
                />
              </FormInput>
              <FormInput label="Point per match" required>
                <InputField
                  placeholder="Tournament Name"
                  name="match_point"
                  value={data.match_point}
                  onChange={onChange}
                  type="text"
                  required
                />
              </FormInput>
              {groupData?.user_select === 1 && (
                <FormInput label="Number of Team" required>
                  <InputField
                    placeholder="Number of Team"
                    name="number_of_team"
                    value={data.number_of_team}
                    onChange={onChange}
                    type="number"
                    min={1}
                    required
                  />
                </FormInput>
              )}
              <Button title="Submit" type="submit" />
            </Box>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export { EditGroup }
