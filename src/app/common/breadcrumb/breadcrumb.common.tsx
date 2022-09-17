import { useNavigation } from 'react-auth-navigation'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export const Breadcrumb = () => {
  const {
    params,
    navigation: { routes, navigate },
  }: any = useNavigation()

  const activeTabs = Object.keys(routes)
    .filter((route) => routes[route].active)
    .map((route) => routes[route])

  const handleClick = (e: any, path?: any) => {
    e.preventDefault()
    navigate(
      path
        ?.replace(':stockId', String(params?.stockId))
        .replace(':bookingId', String(params?.bookingId))
        .replace(':menuItemId', String(params?.menuItemId))
        .replace(':categoryId', String(params?.categoryId))
        .replace(':orderId', String(params?.orderId))
        .replace(':orderItemId', String(params?.orderItemId))
    )
  }

  return (
    <div className="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        {activeTabs.map(
          ({ name, path }, index, arr) =>
            index !== arr.length - 1 && (
              <Link
                key={index}
                color="inherit"
                href="/"
                onClick={(e: any) => handleClick(e, path)}
              >
                {name}
              </Link>
            )
        )}
        <Typography color="textPrimary" className="breadcrumb-link">
          {activeTabs[activeTabs.length - 1].name}
        </Typography>
      </Breadcrumbs>
    </div>
  )
}
