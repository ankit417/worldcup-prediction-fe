import { Dispatch } from 'react'
import { MdCancel } from 'react-icons/md'
// import { useDispatch } from 'react-redux'
import { Modal } from 'react-uicomp'
import { useFormInput } from 'use-form-input'
import { colors } from '../../../../../../modules'

import {
  ActivityIndicator,
  Box,
  Button,
  FormInput,
  Grid,
  InputField,
  Title,
} from '../../../../../common'

// MARK: - AddGroupModal
export const AddGroupModal = ({
  visible,
  setVisible,
  onSubmit,
}: {
  visible: boolean
  setVisible: Dispatch<React.SetStateAction<boolean>>
  onSubmit: (arg: any) => void
}) => {
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
      <Box flexBox alCenter jSpace style={{ width: '20vw' }}>
        <Title size="small">Add Group</Title>
        <Box
          onClick={() => {
            setVisible(false)
          }}
          style={{ cursor: 'pointer' }}
        >
          <MdCancel size={20} color={colors.light.red} />
        </Box>
      </Box>
      <Box mt={20}>
        <form onSubmit={onSubmitHandler}>
          <Box flexBox>
            <Box flex={2}>
              <Box flexBox vertical rowGap={20}>
                <Grid.Container lg={1} md={2} sm={1}>
                  <FormInput label="Name" required>
                    <InputField
                      placeholder="Name"
                      name="name"
                      value={data.name}
                      onChange={onChange}
                      type="text"
                      required
                    />
                  </FormInput>
                </Grid.Container>

                <Grid.Container lg={1} md={2} sm={1}>
                  <FormInput label="Point per match">
                    <InputField
                      placeholder="Point per match"
                      name="point"
                      value={data.point}
                      onChange={onChange}
                      type="number"
                      required
                    />
                  </FormInput>
                </Grid.Container>

                <Box flexBox jEnd alCenter>
                  <ActivityIndicator animating={false}>
                    <Button title="Submit" type="submit" />
                  </ActivityIndicator>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
