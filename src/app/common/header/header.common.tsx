import { useState } from 'react'
import { Dropdown, Menu, Modal } from 'react-uicomp'
import { useAuth } from 'react-auth-navigation'

import { MdMenu, MdKeyboardArrowDown } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { ImUser } from 'react-icons/im'

import { useDispatch, useSelector } from 'react-redux'

import { ActivityIndicator, Breadcrumb, Button, InputField } from '..'
import { logoutAction, passwordAction } from '../../../redux'
import { useInput } from '../../../hooks'
import { isValid, validator } from '../../../utils'

export const Header = () => {
  const { handleLogout, setSideMenuStable, sideNavExpanded } = useAuth()

  const { passwordLoader } = useSelector((state: any) => state.login)
  const { user } = useSelector((state: any) => state.user)

  const dispatch = useDispatch()
  const [visible, setVisible] = useState<boolean>(false)

  const { data, onChangeHandler } = useInput({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const onSubmitHandler = (e: any) => {
    e.preventDefault()

    const { oldPassword, newPassword, confirmPassword } = data

    const catchedErros = {}
    const validate = validator(catchedErros)

    validate('oldPassword', oldPassword.length === 0, () => {
      console.log({ message: 'Enter Old Password!', type: 'error' })
    })

    validate('newPassword', newPassword.length === 0, () => {
      console.log({ message: 'Enter New Password!', type: 'error' })
    })

    validate('newPassword', newPassword.length < 7, () => {
      console.log({
        message: 'New Password length should be greater than 7!',
        type: 'error',
      })
    })

    validate('confirmPassword', confirmPassword.length === 0, () => {
      console.log({ message: 'Re enter New Password!', type: 'error' })
    })

    if (!!confirmPassword && !!newPassword) {
      validate('confirmPassword', confirmPassword !== newPassword, () => {
        console.log({ message: 'Passwords do not match!', type: 'error' })
      })
    }

    if (!isValid(catchedErros)) {
      console.error(catchedErros)
      return
    }

    let body = {
      oldPass: oldPassword,
      newPass: newPassword,
    }
    dispatch(passwordAction(body, modalCloseHandler))
  }

  const modalCloseHandler = () => {
    setVisible(false)
  }
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div
            className="header-menu"
            onClick={() => setSideMenuStable((prev: boolean) => !prev)}
          >
            {sideNavExpanded ? (
              <BsThreeDotsVertical size={18} />
            ) : (
              <MdMenu size={22} />
            )}
          </div>
          <div className="header-breadcrumb">
            <Breadcrumb />
          </div>
        </div>

        <div className="header-right">
          {/* <div className="header-buttons">
            <button
              className="header-buttons-add"
              onClick={() => {
                setOptionsVisible(!optionsVisible);
              }}
            >
              <MdAddToPhotos />
            </button>
          </div> */}

          <div className="logged-user">
            <Dropdown
              placement="bottomright"
              style={{
                top: 0,
              }}
              trigger={() => (
                <div className="logged-user-container">
                  <span className="logged-user-icon">
                    <ImUser size={18} />
                  </span>

                  <span className="logged-user-name">{user?.role}</span>

                  <span className="logged-user-arrow-down">
                    <MdKeyboardArrowDown size={24} />
                  </span>
                </div>
              )}
            >
              <Menu.Container>
                <Menu.Item
                  className="menuItem"
                  onClick={() => setVisible(true)}
                >
                  Change Password
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  className="menuItem danger"
                  style={{ width: '100%', textAlign: 'left' }}
                  onClick={() => dispatch(logoutAction(handleLogout))}
                >
                  Logout
                </Menu.Item>
              </Menu.Container>
            </Dropdown>
            <Modal visible={visible}>
              <h3 style={{ marginBottom: 20 }}>Change Password</h3>
              <form
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  rowGap: 10,
                }}
                onSubmit={onSubmitHandler}
              >
                <InputField
                  onChange={onChangeHandler('oldPassword')}
                  name="oldPassword"
                  placeholder="Old Password"
                  type="password"
                />
                <InputField
                  onChange={onChangeHandler('newPassword')}
                  placeholder="Password"
                  name="newPassword"
                  type="password"
                />
                <InputField
                  onChange={onChangeHandler('confirmPassword')}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />

                <ActivityIndicator animating={passwordLoader}>
                  <Button.Ripple title="Submit" />
                </ActivityIndicator>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
