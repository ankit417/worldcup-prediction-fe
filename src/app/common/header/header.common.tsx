import { useState } from 'react'
import { Dropdown, Menu, Modal } from 'react-uicomp'
import { useAuth } from 'react-auth-navigation'

import { MdMenu, MdKeyboardArrowDown } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { ImUser } from 'react-icons/im'
import { AiFillCloseCircle } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux'

import { ActivityIndicator, Breadcrumb, Button, InputField } from '..'
import { logoutAction, passwordAction } from '../../../redux'
import { useInput } from '../../../hooks'
import { isValid, validator } from '../../../utils'
import toast from 'react-hot-toast'
import { Tiesheet } from '../Tiesheet/tiesheet.common'

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
      // console.log({ message: 'Enter Old Password!', type: 'error' })
      toast.error('Enter old password')
    })

    validate('newPassword', newPassword.length === 0, () => {
      // console.log({ message: 'Enter New Password!', type: 'error' })
      toast.error('Enter new password')
    })

    validate('newPassword', newPassword.length < 7, () => {
      // console.log({
      //   message: 'New Password length should be greater than 7!',
      //   type: 'error',
      // })
      toast.error('New Password length should be greater than 7 character!')
    })

    validate('confirmPassword', confirmPassword.length === 0, () => {
      // console.log({ message: 'Re enter New Password!', type: 'error' })
      toast.error('Re-enter new password')
    })

    if (!!confirmPassword && !!newPassword) {
      validate('confirmPassword', confirmPassword !== newPassword, () => {
        // console.log({ message: 'Passwords do not match!', type: 'error' })
        toast.error('Passwords do not match!')
      })
    }

    if (!isValid(catchedErros)) {
      // console.error(catchedErros)
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
          {user?.role == 'admin' && (
            <>
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
            </>
          )}
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
          <Tiesheet />

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

                  <span className="logged-user-name">{user?.name}</span>

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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ marginBottom: 20 }}>Change Password</h3>
                <AiFillCloseCircle
                  size={24}
                  color="red"
                  onClick={() => {
                    setVisible(false)
                  }}
                />
              </div>
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
