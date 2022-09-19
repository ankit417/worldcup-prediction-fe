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

const AddTournament = ({ visible, onClose, onSubmit }: any) => {
  const [data, { onChange, clear }] = useFormInput({
    tournament_name: '',
    start_date: '',
    end_date: '',
    prediction_deadline: '',
  })

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { tournament_name, start_date, end_date, prediction_deadline } = data
    const requestBody = {
      tournament_name,
      start_date,
      end_date,
      prediction_deadline,
    }
    onSubmit(requestBody)
    clear()
  }

  return (
    <Modal visible={visible}>
      <div>
        <div className="addTournament-title-wrapper">
          <Title>Add Tournament</Title>
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
              <FormInput label="Tournament Name" required>
                <InputField
                  placeholder="Tournament Name"
                  name="tournament_name"
                  value={data.tournament_name}
                  onChange={onChange}
                  type="text"
                  required
                />
              </FormInput>
              <FormInput label="Start Date" required>
                <InputField
                  placeholder="Start Date"
                  name="start_date"
                  value={data.start_date}
                  onChange={onChange}
                  type="date"
                  required
                />
              </FormInput>
              <FormInput label="End Date" required>
                <InputField
                  placeholder="End Date"
                  name="end_date"
                  value={data.end_date}
                  onChange={onChange}
                  type="date"
                  required
                />
              </FormInput>
              <FormInput label="Prediction Deadline" required>
                <InputField
                  placeholder="Prediction Deadline"
                  name="prediction_deadline"
                  value={data.prediction_deadline}
                  onChange={onChange}
                  type="date"
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

export { AddTournament }
