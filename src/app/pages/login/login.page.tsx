import { useState } from 'react'
import { useAuth } from 'react-auth-navigation'

import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-uicomp'
import { toast } from 'react-hot-toast'
import { useInput } from '../../../hooks'

import { forgetPassword, loginAction } from '../../../redux'
import { isValid, validator } from '../../../utils'
import { ActivityIndicator, Button, Card, InputField } from '../../common'

export const LoginPage = () => {
  const { handleLogin } = useAuth()
  const dispatch = useDispatch()
  const { loading, forgetPasswordLoader } = useSelector(
    (state: any) => state.login
  )
  const { data, onChangeHandler } = useInput({
    email: '',
    password: '',
    forgetEmail: '',
  })

  const [visible, setVisible] = useState(false)

  const onLogin = async (e: any) => {
    e.preventDefault()
    const { email, password } = data
    const catchedErros = {}
    const validate = validator(catchedErros)

    validate('email', email.length === 0, () => {
      toast.error("Email musn't be empty!")
    })

    validate('password', password.length === 0, () => {
      toast.error("Password musn't be empty!")
    })

    if (!isValid(catchedErros)) {
      console.error(catchedErros)
      return
    }

    let body = {
      username: email,
      password,
    }

    console.log('Login body', body)
    dispatch(loginAction(body, handleLogin))
  }

  const onResetPasswordSubmit = (e: any) => {
    e.preventDefault()
    const catchedErros = {}
    const validate = validator(catchedErros)

    const { forgetEmail } = data

    validate('forgetEmail', forgetEmail.length === 0, () => {
      toast.error("Email musn't be empty!")
    })

    if (!isValid(catchedErros)) {
      console.error(catchedErros)
      return
    }

    // forgot password action dispatch
    dispatch(
      forgetPassword(
        {
          email: forgetEmail,
        },
        () => {
          setVisible(false)
        }
      )
    )
  }

  return (
    <div className="login-container">
      <div className="login">
        <Card>
          <form onSubmit={onLogin}>
            <div className="login-contents">
              <h1 className="login-head">LOGIN</h1>
              <div className="login-fields">
                <p className="login-fields-title">Email</p>
                <InputField
                  placeholder="Email"
                  name="email"
                  value={data?.email}
                  onChange={onChangeHandler('email')}
                  type="text"
                />
              </div>
              <div className="login-fields">
                <h1 className="login-fields-title">Password</h1>
                <InputField
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler('password')}
                  type="password"
                />
              </div>
              {/* <div className="login-forgot" onClick={() => setVisible(true)}>
                Forgot Password ?
              </div> */}

              <div className="login-action">
                <ActivityIndicator animating={loading}>
                  <Button
                    type="submit"
                    title="login"
                    className=" fit-content"
                  />
                </ActivityIndicator>
              </div>
            </div>
          </form>
        </Card>

        {/* FORGOT PASSWORD MODAL */}
        <Modal visible={visible}>
          <h1 className="login-head">Forgot password</h1>
          <p
            style={{
              paddingBottom: 10,
            }}
          >
            We will send you a link to reset your password
          </p>

          <form
            className="login-fields"
            //  onSubmit={onResetPasswordSubmit}
          >
            <p className="login-fields-title">Email</p>
            <InputField
              placeholder="Email"
              name="forgetEmail"
              value={data?.forgetEmail}
              onChange={onChangeHandler('forgetEmail')}
              type="forgetEmail"
            />

            <div style={{ height: 20 }} />

            <div className="login-action">
              <ActivityIndicator animating={forgetPasswordLoader}>
                <Button
                  type="submit"
                  title="Reset Password"
                  className="fit-content"
                  onClick={onResetPasswordSubmit}
                />
              </ActivityIndicator>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}
