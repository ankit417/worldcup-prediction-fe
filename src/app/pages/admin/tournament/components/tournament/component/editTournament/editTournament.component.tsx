import { useEffect } from 'react'
import moment from 'moment'
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

const EditTournament = ({
  visible,
  onClose,
  onSubmit,
  tournamentData,
}: any) => {
  const [data, { onChange, setValue, clear }] = useFormInput({
    tournament_name: '',
    starting_from: '',
    ending_at: '',
    prediction_deadline: '',
  })

  //console.log('tournament data', tournamentData)
  useEffect(() => {
    setValue('tournament_name', tournamentData?.tournament_name ?? '')
    setValue('starting_from', tournamentData?.starting_from ?? '')
    setValue('ending_at', tournamentData?.ending_at ?? '')
    setValue('prediction_deadline', tournamentData?.prediction_deadline ?? '')
  }, [tournamentData])

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { tournament_name, starting_from, ending_at, prediction_deadline } =
      data
    const requestBody = {
      tournament_name,
      starting_from,
      ending_at,
      prediction_deadline,
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
                  name="starting_from"
                  //   value={data.starting_from}
                  value={moment(data.starting_from).format('YYYY-MM-DD')}
                  onChange={onChange}
                  type="date"
                  required
                />
              </FormInput>
              <FormInput label="End Date" required>
                <InputField
                  placeholder="End Date"
                  name="ending_at"
                  //   value={data.ending_at}
                  value={moment(data.ending_at).format('YYYY-MM-DD')}
                  onChange={onChange}
                  type="date"
                  required
                />
              </FormInput>
              <FormInput label="Prediction Deadline" required>
                <InputField
                  placeholder="Prediction Deadline"
                  name="prediction_deadline"
                  //   value={data.prediction_deadline}
                  value={moment(data.prediction_deadline).format('YYYY-MM-DD')}
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

export { EditTournament }
