import { useEffect, useState } from 'react'

import { useFormInput } from 'use-form-input'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserListAction,
  RootState,
  createUser,
  deleteUser,
  editUserAction,
  searchUserListAction,
  resetPasswordAction,
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
import { EditUser, ResetPassword } from './component'
import { isValid, validator } from '../../../../utils'
import toast from 'react-hot-toast'
import { useComponentDidUpdate, useDebounceValue } from '../../../../hooks'
import { useQuery } from 'react-auth-navigation'
export const UserList = () => {
  const [editUserVisible, setEditUserVisible] = useState<boolean>(false)
  const [resetPasswordVisible, setResetPasswordVisible] =
    useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const dispatch = useDispatch()
  const { userListLoading, userlist, userlistTotalCount } = useSelector(
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

  const query: any = useQuery()

  const pageNumber = query?.page || 1

  console.log('pageNumber', pageNumber)

  const [searchEmail, setSearchEmail] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const emailDebounce = useDebounceValue(searchEmail)
  const phoneDebounce = useDebounceValue(searchPhone)

  useEffect(() => {
    // getUserListAction
    dispatch(getUserListAction(pageNumber))
  }, [dispatch, pageNumber])

  useComponentDidUpdate(() => {
    if (!!emailDebounce || !!phoneDebounce) {
      const body = {} as any
      if (!!emailDebounce) {
        body.email = emailDebounce
      }
      if (!!phoneDebounce) {
        body.phone = phoneDebounce
      }
      dispatch(searchUserListAction(body))
    } else {
      dispatch(getUserListAction())
    }
  }, [dispatch, emailDebounce, phoneDebounce])
  const onSubmitHandler = (e: any) => {
    console.log('On submit')
    e.preventDefault()
    const { full_name, email, phone, password } = data
    const catchedErros = {}
    const validate = validator(catchedErros)

    validate('full_name', full_name.length < 3, () => {
      toast.error('Enter a valid name')
      console.log('Invalid full name')
    })
    validate('email', email.length < 3, () => {
      toast.error('Enter a valid email')
    })
    validate('phone', phone.length < 3, () => {
      toast.error('Enter a valid phone number')
    })
    validate('password', password.length < 8, () => {
      toast.error('Password must of atleast 8 characters ')
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

  const onEditUser = (data: any) => {
    if (data?.id) {
      dispatch(
        editUserAction(data?.id, data, () => {
          setEditUserVisible(false)
          dispatch(getUserListAction())
        })
      )
    }
    console.log('request data on edit user', data)
  }

  const onResetHandler = (data: any) => {
    if (selectedUser?.id) {
      dispatch(
        resetPasswordAction(selectedUser?.id, data, toast, () => {
          setResetPasswordVisible(false)
          setSelectedUser(null)
        })
      )
    }
  }

  console.log('userlistTotalCount', userlistTotalCount)

  return (
    <CompWrapper>
      <EditUser
        visible={editUserVisible}
        onClose={() => {
          setEditUserVisible(false)
        }}
        onSubmit={onEditUser}
        userData={selectedUser}
      />

      <ResetPassword
        visible={resetPasswordVisible}
        onClose={() => {
          setResetPasswordVisible(false)
        }}
        onSubmit={onResetHandler}
      />
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
        <Box flexBox jEnd>
          <Box>
            <FormInput
              label="Email"
              newElement={
                !!searchEmail && (
                  <div onClick={() => setSearchEmail('')}>clear</div>
                )
              }
            >
              <InputField
                placeholder="Email"
                name="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                type="text"
              />
            </FormInput>
          </Box>

          <Box>
            <FormInput
              label="Phone Number"
              newElement={
                searchPhone && (
                  <div onClick={() => setSearchPhone('')}>clear</div>
                )
              }
            >
              <InputField
                placeholder="Phone Number"
                name="phone"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                type="number"
              />
            </FormInput>
          </Box>
        </Box>
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
            totalCount={userlistTotalCount}
            actions
            onEditHandler={(data: any) => {
              // console.log('Edit user', data)
              setSelectedUser(data)
              setEditUserVisible(true)
            }}
            onResetHandler={(data: any) => {
              setSelectedUser(data)
              setResetPasswordVisible(true)
            }}
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
