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
  const [data, { onChange, setValue, clear }] = useFormInput({
    // tournament_id: '',
    group_name: '',
    is_final: '',
    match_point: '',
  })

  //   console.log('tournament data', tournamentData)
  useEffect(() => {
    // setValue('tournament_id', groupData?.tournament_id ?? '')
    setValue('group_name', groupData?.group_name ?? '')
    setValue('is_final', groupData?.is_final ?? '')
    setValue('match_point', groupData?.match_point ?? '')
  }, [groupData])

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { group_name, match_point, is_final } = data
    const requestBody = {
      group_name,
      match_point,
      is_final,
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
              <Button title="Submit" type="submit" />
            </Box>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export { EditGroup }
