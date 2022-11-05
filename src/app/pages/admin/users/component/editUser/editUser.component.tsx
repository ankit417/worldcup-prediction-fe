import { useEffect } from 'react'
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

export const EditUser = ({ visible, onClose, onSubmit, userData }: any) => {
  const [data, { onChange, setValue, clear }] = useFormInput({
    full_name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
  })

  useEffect(() => {
    // setValue('tournament_id', groupData?.tournament_id ?? '')
    setValue('full_name', userData?.full_name ?? '')
    setValue('email', userData?.email ?? '')
    setValue('phone', userData?.phone ?? '')
  }, [userData])

  const onSubmitHandler = (e: any) => {
    // console.log('On submit')
    e.preventDefault()
    const { full_name, email, phone } = data
    const catchedErros = {}
    const validate = validator(catchedErros)

    validate('full_name', full_name.length < 3, () => {
      toast.error('Enter a valid name')
      // console.log('invalid full name')
    })
    validate('email', email.length < 3, () => {
      toast.error('Enter a valid email')
    })
    validate('phone', phone.length < 3, () => {
      toast.error('Enter a valid phone number')
    })

    // console.log('Here')

    if (!isValid(catchedErros)) {
      console.error(catchedErros)
      return
    }

    const requestBody = {
      id: userData?.id,
      full_name,
      email,
      phone,
      role: 'user',
    }
    // console.log('request body', requestBody)
    onSubmit(requestBody)
    clear()
  }

  return (
    <Modal visible={visible}>
      <div>
        <div className="addTournament-title-wrapper">
          <Title>Edit User</Title>
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
              <FormInput label="Full Name" required>
                <InputField
                  placeholder="Full Name"
                  name="full_name"
                  value={data.full_name}
                  onChange={onChange}
                  type="text"
                  required
                />
              </FormInput>
              <FormInput label="Email" required>
                <InputField
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  onChange={onChange}
                  type="text"
                  required
                />
              </FormInput>
              <FormInput label="Phone" required>
                <InputField
                  placeholder="Phone"
                  name="phone"
                  value={data.phone}
                  onChange={onChange}
                  type="number"
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
