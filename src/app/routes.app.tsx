// import { GiFruitBowl } from 'react-icons/gi'
import {
  // MdFastfood,
  // MdHotel,
  // MdRestaurantMenu,
  MdDashboard,
} from 'react-icons/md'

import {
  // HistoryComponent,
  // ListStock,
  LoginPage,
  UserHome,
} from './pages'

import { Tournament, Team, Group } from './pages/admin'

import { DashboardPage } from './pages/dashboard'

// const Redirect = ({ to }: { to: any }): any => {
//   const {
//     navigation: { navigate },
//   } = useNavigation();

//   useEffect(() => {
//     navigate(to);
//   }, [to, navigate]);

//   return null;
// };

export const publicPaths = [
  {
    name: 'Root',
    path: '/',
    component: UserHome,
    restricted: true,
  },
  {
    name: 'Login',
    path: '/login',
    component: LoginPage,
    restricted: true,
  },
]

export const privatePaths = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: DashboardPage,
    props: {
      icon: <MdDashboard />,
    },
  },
  {
    name: 'Tournament',
    path: '/tournament',
    component: Tournament,
    props: {
      icon: <MdDashboard />,
    },
    subPaths: [
      {
        name: 'Group',
        path: '/:tournamentId',
        component: Group,
      },
      {
        name: 'View',
        path: '/view/:tournamentId',
        component: Group,
      },
    ],
  },
  {
    name: 'Team',
    path: '/team',
    component: Team,
    props: {
      icon: <MdDashboard />,
    },
  },
]
