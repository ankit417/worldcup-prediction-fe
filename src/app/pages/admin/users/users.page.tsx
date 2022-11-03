import { useEffect } from 'react'

import { useFormInput } from 'use-form-input'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserListAction,
  RootState,
  createUser,
  deleteUser,
} from '../../../../redux'
import {
  Card,
  CompWrapper,
  Title,
  FormInput,
  InputField,
  Box,
  Hrline,
  Button,
  Table,
} from '../../../common'
import { isValid, validator } from '../../../../utils'
import toast from 'react-hot-toast'
export const UserList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // getUserListAction
    dispatch(getUserListAction())
  }, [])

  const { userListLoading, userlist } = useSelector(
    (state: RootState) => state.user
  )

  const [
    data,
    {
      onChange,
      //  setValue,
      clear,
    },
  ] = useFormInput({
    full_name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
  })

  const onSubmitHandler = (e: any) => {
    console.log('On submit')
    e.preventDefault()
    const { full_name, email, phone, password } = data
    const catchedErros = {}
    const validate = validator(catchedErros)

    validate('full_name', full_name.length < 3, () => {
      toast.error('Enter a valid name')
      console.log('invalid full name')
    })
    validate('email', email.length < 3, () => {
      toast.error('Enter a valid email')
    })
    validate('phone', phone.length < 3, () => {
      toast.error('Enter a valid phone number')
    })
    validate('password', password.length < 8, () => {
      toast.error('password must of atleast 8 characters ')
    })

    console.log('Here')

    if (!isValid(catchedErros)) {
      console.error(catchedErros)
      return
    }

    const requestBody = {
      full_name,
      email,
      password,
      phone,
      role: 'user',
    }
    console.log('request body', requestBody)
    dispatch(
      createUser(requestBody, () => {
        clear()
        dispatch(getUserListAction())
        console.log('user created')
      })
    )
    // onSubmit(requestBody)
    // clear()
  }

  return (
    <CompWrapper>
      <Card containerStyle={{ marginBottom: 30 }}>
        <Title>Create User</Title>
        <Hrline />
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
            <FormInput label="Password" required>
              <InputField
                placeholder="password"
                name="password"
                value={data.password}
                onChange={onChange}
                type="text"
                required
              />
            </FormInput>
            <Button title="Submit" type="submit" />
          </Box>
        </form>
      </Card>
      <Card>
        <Title>Users list</Title>
        <Hrline />
        <div>
          <Table
            columns={[
              {
                field: 'full_name',
                name: 'Full Name',
                render: (rowData: any) => rowData,
              },
              {
                field: 'email',
                name: 'Email',
                render: (rowData: any) => rowData,
              },
              {
                field: 'phone',
                name: 'Phone Number',
                render: (rowData: any) => rowData,
              },
              {
                field: 'role',
                name: 'Role',
                render: (rowData: any) => rowData,
              },
            ]}
            data={userlist}
            dataLoader={userListLoading}
            totalCount={userlist.length}
            actions
            onDeleteHandler={(data: any) => {
              //   toast.error(data?.id)
              // console.log('delete handler data', data)
              // deleteHandler(data?.id)
              dispatch(
                deleteUser(data?.id, () => {
                  dispatch(getUserListAction())
                })
              )
            }}
          />
        </div>
      </Card>
    </CompWrapper>
  )
}
