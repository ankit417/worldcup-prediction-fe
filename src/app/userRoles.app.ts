export const userType = {
  ADMIN: 'admin',
  USER: 'user',
}

export const userRoles = {
  [userType.ADMIN]: {
    access: [
      '/',
      '/stock/*',
      '/hotel/*',
      '/menu/*',
      '/dashboard/*',
      '/order/*',
      '/tournament/*',
      '/match/*',
      '/team/*',
      '/prediction-result/*',
      '/users/*',
      '/user-profile/*',
    ],
  },
  [userType.USER]: {
    access: ['/', '/login', '/predict'],
  },
}
