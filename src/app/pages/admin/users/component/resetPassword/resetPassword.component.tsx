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
} from '../../../../../common'
import { isValid, validator } from '../../../../../../utils'
import toast from 'react-hot-toast'

export const ResetPassword = ({ visible, onClose, onSubmit }: any) => {
  const [data, { onChange }] = useFormInput({
    password: '',
    confirmPassword: '',
  })

  const onSubmitHandler = (e: any) => {
    console.log('On submit')
    e.preventDefault()
    const { password, confirmPassword } = data
    const catchedErros = {}
    const validate = validator(catchedErros)

    validate('password', password.length < 3, () => {
      toast.error('Enter a Pasword')
    })

    validate('confirmPassword', confirmPassword.length < 3, () => {
      toast.error('Enter confirm Pasword')
    })

    !!confirmPassword &&
      !!password &&
      validate('confirmPassword', confirmPassword !== password, () => {
        toast.error('Passwords do not match')
      })

    console.log('Here')

    if (!isValid(catchedErros)) {
      console.error(catchedErros)
      return
    }

    const requestBody = {
      password: password,
    }
    onSubmit(requestBody)
  }

  return (
    <Modal visible={visible}>
      <div>
        <div className="addTournament-title-wrapper">
          <Title>Reset Password</Title>
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
              <FormInput label="New Password" required>
                <InputField
                  placeholder="New Password"
                  name="password"
                  value={data.password}
                  onChange={onChange}
                  type="password"
                  required
                />
              </FormInput>
              <FormInput label="Confirm Password" required>
                <InputField
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={onChange}
                  type="password"
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
