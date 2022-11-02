import { useEffect } from 'react'
import { useNavigation, useAuth } from 'react-auth-navigation'
import { AnimatedBlock, bInterpolate, useAnimatedValue } from 'react-ui-animate'
import { NavGroup } from './components'

import Logo1 from '../../../assets/images/logo.png'
import Logo2 from '../../../assets/images/logo.png'

// import Logo1 from '../../../assets/icons/logo1.png'
// import Logo2 from '../../../assets/icons/logo2.png'

const SideNavComponent = () => {
  const { navigation } = useNavigation()
  const { routes, navigate } = navigation
  const { sideNavExpanded, setSideNavExpanded, sideMenuStable } = useAuth()
  const expandAnimation = useAnimatedValue(sideNavExpanded)

  const getNavGroupItems = (name: any) => {
    return Object.keys(routes)
      .filter((route) => {
        return routes[route].props?.group === name
      })
      .map((route) => {
        return {
          name: routes[route].name,
          path: routes[route].path,
          active: routes[route].active,
        }
      })
  }

  const getNavGroup = (route: any) => {
    if (!route) {
      return null
    }

    const navItems = getNavGroupItems(route.name)
    const hasChild = navItems.length !== 0
    const icon = route.props?.icon
    return (
      route && (
        <NavGroup
          title={route.name}
          navItems={navItems}
          onClick={() => {
            if (!hasChild) {
              navigate(route.path)
            }
          }}
          active={route.active}
          hasChild={hasChild}
          icon={icon}
        />
      )
    )
  }

  useEffect(() => {
    setSideNavExpanded(sideMenuStable)
  }, [sideMenuStable, setSideNavExpanded])

  return (
    <div className="sidenav-container" style={{ zIndex: 99 }}>
      <AnimatedBlock
        style={{
          width: bInterpolate(expandAnimation.value, [90, 280]),
        }}
        onMouseEnter={() => {
          if (!sideMenuStable && !sideNavExpanded) {
            setSideNavExpanded(true)
          }
        }}
        onMouseLeave={() => {
          if (!sideMenuStable && sideNavExpanded) {
            setSideNavExpanded(false)
          }
        }}
        className="sidenav"
      >
        <AnimatedBlock
          className="sidenav-header"
          onClick={() => navigation.navigate('/')}
        >
          <div className="sidenav-header-logo1">
            <img src={Logo1} alt="Logo1" />
          </div>

          {sideNavExpanded && (
            <div className="sidenav-header-logo2">
              <img src={Logo2} alt="Logo2" />
            </div>
          )}
        </AnimatedBlock>
        {getNavGroup(routes['Dashboard'])}
        {getNavGroup(routes['Stock and history'])}
        {getNavGroup(routes['Room'])}
        {getNavGroup(routes['Menu'])}
        {getNavGroup(routes['Order'])}
        {getNavGroup(routes['Tournament'])}
        {getNavGroup(routes['Team'])}
        {getNavGroup(routes['Prediction'])}
        {getNavGroup(routes['Users'])}
      </AnimatedBlock>
    </div>
  )
}

export const SideNav = () => {
  const { isLoggedIn } = useAuth()

  return (
    isLoggedIn && (
      <div className="sidenav-responsive-container">
        <div className="sidenav-responsive-web">
          <SideNavComponent />
        </div>
      </div>
    )
  )
}
