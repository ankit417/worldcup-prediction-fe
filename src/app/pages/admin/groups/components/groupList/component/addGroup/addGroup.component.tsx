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

const AddGroup = ({ visible, onClose, onSubmit }: any) => {
  const [data, { onChange, clear }] = useFormInput({
    name: '',
    point: '',
    isFinal: false,
  })

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { name, point, isFinal } = data
    const requestBody = {
      name,
      point,
      isFinal,
    }
    onSubmit(requestBody)
    clear()
  }

  return (
    <Modal visible={visible}>
      <div>
        <div className="addTournament-title-wrapper">
          <Title>Add Group</Title>
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
                  placeholder="Group Name"
                  name="name"
                  value={data.name}
                  onChange={onChange}
                  type="text"
                  required
                />
              </FormInput>
              <FormInput label="Point Per Match" required>
                <InputField
                  placeholder="Point Per Match"
                  name="point"
                  value={data.point}
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

export { AddGroup }
