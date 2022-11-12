import { useState } from 'react'
import { useAuth } from 'react-auth-navigation'

import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-uicomp'
import { toast } from 'react-hot-toast'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useInput } from '../../../hooks'

import {
  // forgetPassword,
  loginAction,
} from '../../../redux'
import { isValid, validator } from '../../../utils'
import { ActivityIndicator, Button, Card, InputField } from '../../common'
import CLUB_PHOTO from '../../../assets/images/YETI-FC-LOGO.png'
export const LoginPage = () => {
  const { handleLogin } = useAuth()
  const dispatch = useDispatch()
  const {
    loading,
    //  forgetPasswordLoader
  } = useSelector((state: any) => state.login)
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

    // console.log('Login body', body)
    dispatch(loginAction(body, handleLogin))
  }

  // const onResetPasswordSubmit = (e: any) => {
  //   e.preventDefault()
  //   const catchedErros = {}
  //   const validate = validator(catchedErros)

  //   const { forgetEmail } = data

  //   validate('forgetEmail', forgetEmail.length === 0, () => {
  //     toast.error("Email musn't be empty!")
  //   })

  //   if (!isValid(catchedErros)) {
  //     console.error(catchedErros)
  //     return
  //   }

  //   // forgot password action dispatch
  //   dispatch(
  //     forgetPassword(
  //       {
  //         email: forgetEmail,
  //       },
  //       () => {
  //         setVisible(false)
  //       }
  //     )
  //   )
  // }

  return (
    <div className="login-container">
      <div className="inner-card">
        <Card
          containerStyle={{
            width: '70vw',
          }}
        >
          <div className="card-wrapper">
            <div className="inner-card-left-section">
              <img
                src={CLUB_PHOTO}
                alt="Club photo"
                width={'100%'}
                height={'100%'}
                className="club-image"
              />
            </div>
            <div className="inner-card-right-section">
              <div className="login">
                {/* <Card> */}
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
                    <div
                      className="login-forgot"
                      onClick={() => setVisible(true)}
                    >
                      Game Rules
                    </div>
                    <div className="login-fields">
                      Registration Link{' '}
                      <a
                        href="https://forms.gle/sULF8YsPdQ8Mhfyi9"
                        target="_blank"
                      >
                        Click Here
                      </a>
                    </div>
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
                {/* </Card> */}

                {/* FORGOT PASSWORD MODAL */}
                <Modal visible={visible} style={{ width: '90vw' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <h2 className="login-head">YETI FC Worldcup Fun 2022</h2>
                    <AiOutlineCloseCircle
                      size={24}
                      color={'#FF0000'}
                      onClick={() => {
                        setVisible(false)
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <p
                    style={{
                      paddingBottom: 10,
                    }}
                  >
                    <h3> Playing conditions: </h3>
                    <br />
                    <div style={{ marginTop: 5 }}>
                      1) Participation fee : Aud $100 <br />
                    </div>
                    <div style={{ marginTop: 5 }}>
                      2) Entries can be made by submitting the EOI and payment
                      at :
                      <div style={{ marginLeft: 15 }}>
                        <br />
                        <b>Yeti FC BSB :063111</b>
                        <br />
                        <b>Account: 11066537</b>
                      </div>
                      <br />
                    </div>
                    <div style={{ marginTop: 5 }}>
                      3) Last date of entry 19 Nov 2022 <br />
                    </div>
                    <div style={{ marginTop: 5 }}>
                      4) Points calculations: <br />
                    </div>
                    <div style={{ marginTop: 5, marginLeft: 15 }}>
                      League - 48 matches * 0.5 = 24 P <br />
                      Pre Quarter - 16 teams * 1 = 16 P <br />
                      Quarter- 8 * 2 = 16 P <br />
                      Semis - 4 * 4 = 16 P <br />
                      Finals- 2 * 8 = 16 P <br />
                      Champion team - 1 * 12 = 12 P <br />
                      Total = 100 points <br />
                    </div>
                    <div style={{ marginTop: 5 }}>
                      5) 30% of the totals raised money shall go towards
                      expenses and the Yeti FC fund.
                    </div>
                    <div style={{ marginTop: 5 }}>
                      6)The prize amount will be 70% of total collected amount.
                    </div>
                    <div style={{ marginTop: 5 }}>
                      7) Prize Money will be distributed as follows to the
                      participants scoring most points:
                      <div style={{ marginTop: 5, marginLeft: 15 }}>
                        1st Prize 50% of the Prize amount
                      </div>
                      <div style={{ marginTop: 5, marginLeft: 15 }}>
                        2nd Prize 20% of the Prize amount
                      </div>
                      <div style={{ marginTop: 5, marginLeft: 15 }}>
                        3rd Prize 15% of the Prize amount
                      </div>
                      <div style={{ marginTop: 5, marginLeft: 15 }}>
                        4th Prize 10% of the Prize amount
                      </div>
                      <div style={{ marginTop: 5, marginLeft: 15 }}>
                        5th Prize 5 % of the Prize amount
                      </div>
                      <div style={{ marginTop: 5, marginLeft: 15 }}>
                        Only top 5 entries / scores are eligible for the prize
                        money distribution. Should there be more than 5 entries/
                        scores claiming the prize money, the same shall be
                        equally distributed For example. say 3 entries are in
                        1st position, then prize money allotted for first three
                        positions shall be equally distributed amongst the three
                        and and 2nd highest scorer shall get 4th prize money
                        allotted and so on. <br />
                      </div>
                    </div>
                    <div style={{ marginTop: 5 }}>
                      If any queries please contact :
                    </div>
                    <div style={{ marginTop: 5, marginLeft: 15 }}>
                      <b>Sajjan sharma 0416787586</b>
                    </div>
                    <div style={{ marginTop: 5, marginLeft: 15 }}>
                      <b>Arun Shrestha 0450570756</b>
                    </div>
                  </p>
                </Modal>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
