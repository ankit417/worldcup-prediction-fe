// import { GiFruitBowl } from 'react-icons/gi'
import {
  // MdFastfood,
  // MdHotel,
  // MdRestaurantMenu,
  MdLeaderboard,
  MdDashboard,
} from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'

import {
  // HistoryComponent,
  // ListStock,
  LoginPage,
  UserHome,
} from './pages'

import {
  Tournament,
  Team,
  Group,
  Predictions,
  UserList,
  PredictionProfile,
} from './pages/admin'

// import { DashboardPage } from './pages/dashboard'

// const Redirect = ({ to }: { to: any }): any => {
//   const {
//     navigation: { navigate },
//   } = useNavigation();

//   useEffect(() => {
//     navigate(to);
//   }, [to, navigate]);

//   return null;
// };

// console.log('user home', UserHome)
export const publicPaths = [
  {
    name: 'Root',
    path: '/',
    component: LoginPage,
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
  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   component: DashboardPage,
  //   props: {
  //     icon: <MdDashboard />,
  //   },
  // },
  {
    name: 'Predict',
    path: '/predict',
    component: UserHome,
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
      icon: <RiTeamFill />,
    },
  },
  {
    name: 'Prediction',
    path: '/prediction-result',
    component: Predictions,
    props: {
      icon: <MdLeaderboard />,
    },
  },
  {
    name: 'user-profile',
    path: '/user-profile/:tournamentId/:userId',
    component: PredictionProfile,
    props: {
      icon: <MdDashboard />,
    },
  },
  {
    name: 'Users',
    path: '/users',
    component: UserList,
    props: {
      icon: <FaUserEdit />,
    },
  },
]
