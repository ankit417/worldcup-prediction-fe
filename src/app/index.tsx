import { useState, useEffect } from 'react'
import { Auth, withNavigation } from 'react-auth-navigation'
import { useDispatch } from 'react-redux'

import { publicPaths, privatePaths } from './routes.app'
import { userRoles, userType } from './userRoles.app'

import { userAuthAction, userAuthLogoutAction } from '../redux'
import { removeCookie, setCookie } from '../helpers'
import { SideNav } from './common'
import { Toaster } from 'react-hot-toast'

const MemoChild = ({ children }: { children: any }) => {
  const dispatch = useDispatch()
  const [authLoading, setAuthLoading] = useState(true)

  const [config, setConfig] = useState({
    isLoggedIn: true,
    userRole: userType.ADMIN,
  })

  const [sideNavExpanded, setSideNavExpanded] = useState(true) // for collapsible sidenav
  const [sideMenuStable, setSideMenuStable] = useState(sideNavExpanded)

  const loginSuccess = (role: any) => {
    setConfig({
      isLoggedIn: true,
      userRole: role,
    })
  }

  const loginFailure = () => {
    setConfig({
      isLoggedIn: false,
      userRole: userType.USER,
    })
  }

  useEffect(() => {
    dispatch(userAuthAction(setAuthLoading, loginSuccess, loginFailure))
  }, [dispatch])

  if (authLoading) {
    return <div>Redirecting...</div>
  }

  return (
    <Auth
      config={config}
      state={{
        // for collapsing sidenav
        sideNavExpanded,
        setSideNavExpanded,
        sideMenuStable,
        setSideMenuStable,
        handleLogin: (token: any, role: any) => {
          setCookie('token', token)
          loginSuccess(role)
        },
        handleLogout: () => {
          dispatch(
            userAuthLogoutAction(() => {
              removeCookie('token')
              loginFailure()
            })
          )
        },
      }}
    >
      {children}
    </Auth>
  )
}

const App = () => {
  return (
    <MemoChild>
      {
        <>
          <Auth.Screens />
          <SideNav />
          <Toaster position="top-right" reverseOrder={false} />
        </>
      }
    </MemoChild>
  )
}

export default withNavigation(App, {
  publicPaths,
  privatePaths,
  userRoles,
  routerType: 'hash',
})
